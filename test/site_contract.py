#!/usr/bin/env python3
"""Check the delivered site contract without rendering or comparing page layouts.

Usage: python3 test/site_contract.py --site /path/to/jekyll/output
The baseline records the tracked site at 2c917d41, before the v1 migration.
Existing missing links are grandfathered by source and target, not globally.
"""

import argparse
import base64
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.references = []
        self.scripts = []
        self.script_attributes = []
        self.styles = []
        self.text_parts = []
        self.hidden_depth = 0
        self.feed(source)

    @property
    def text(self):
        return " ".join(" ".join(self.text_parts).split())

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("name"):
            self.ids.add(attrs["name"])
        if tag in {"script", "style"}:
            self.hidden_depth += 1
        for attribute in ("href", "src", "poster"):
            if attrs.get(attribute):
                self.references.append(attrs[attribute])
        for candidate in attrs.get("srcset", "").split(","):
            if candidate.strip() and not candidate.strip().startswith("data:"):
                self.references.append(candidate.strip().split()[0])
        if tag == "script" and attrs.get("src"):
            self.scripts.append(attrs["src"])
            self.script_attributes.append(attrs)
        if tag == "link" and "stylesheet" in attrs.get("rel", "").split():
            self.styles.append(attrs.get("href", ""))

    def handle_endtag(self, tag):
        if tag in {"script", "style"}:
            self.hidden_depth = max(0, self.hidden_depth - 1)

    def handle_data(self, data):
        if not self.hidden_depth:
            self.text_parts.append(data)


def public_route(path, site):
    relative = path.relative_to(site).as_posix()
    return "/" + (relative[: -len("index.html")] if relative.endswith("index.html") else relative)


def read_pages(site):
    return {
        public_route(path, site): Page(path.read_text(encoding="utf8"))
        for path in sorted(site.rglob("*.html"))
    }


def internal_target(source, reference, origin):
    url = urlsplit(urljoin(origin + source, reference))
    if url.scheme not in {"http", "https"} or url.netloc != urlsplit(origin).netloc:
        return None
    return unquote(url.path), unquote(url.fragment)


def destination(site, path):
    candidate = site / path.lstrip("/")
    if candidate.is_dir():
        candidate = candidate / "index.html"
    if not candidate.is_file() and not candidate.suffix:
        candidate = candidate.with_suffix(".html")
    try:
        candidate.resolve().relative_to(site.resolve())
    except ValueError:
        return None
    return candidate if candidate.is_file() else None


def missing_links(site, pages, origin):
    missing = set()
    for route, page in pages.items():
        for reference in page.references:
            target = internal_target(route, reference, origin)
            if target is None:
                continue
            path, fragment = target
            file = destination(site, path)
            key = route + " -> " + path + ("#" + fragment if fragment else "")
            if file is None:
                missing.add(key)
            elif fragment and file.suffix == ".html":
                target_page = pages.get(public_route(file, site))
                if target_page is not None and fragment not in target_page.ids:
                    missing.add(key)
    return missing


def source_titles(root, collection):
    titles = []
    for path in sorted((root / collection).glob("*.md")):
        match = re.search(r"^title:\s*(.+)$", path.read_text(encoding="utf8"), re.MULTILINE)
        if match:
            value = match.group(1).strip()
            if value.startswith('"'):
                value = json.loads(value)
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1].replace("''", "'")
            titles.append(" ".join(re.sub(r"[*`]", "", value).split()))
    return titles


def check(site, baseline, root):
    errors = []
    pages = read_pages(site)
    if not pages:
        return [f"No HTML output found in {site}"], []
    for route in baseline["routes"]:
        if route not in pages:
            errors.append(f"Missing baseline route: {route}")
    for collection, expected_count in baseline["tracked_counts"].items():
        current_count = len(list((root / collection).glob("*.md")))
        if current_count < expected_count:
            errors.append(f"Missing {collection} records: expected at least {expected_count}, found {current_count}")
    for path in baseline["content_files"]:
        if not (root / path).is_file():
            errors.append(f"Missing original content file: {path}")
    for route, expected in baseline["content"].items():
        text = pages[route].text if route in pages else ""
        for snippet in expected:
            if snippet not in text:
                errors.append(f"Missing expected content on {route}: {snippet}")

    for collection, route in [("_publications", "/publications/"), ("_reviews", "/reviews/")]:
        current = source_titles(root, collection)
        expected = baseline["collection_titles"][collection]
        for title in expected:
            if title not in current:
                errors.append(f"Missing original {collection} record: {title}")
        text = pages[route].text if route in pages else ""
        for title in current:
            if title not in text:
                errors.append(f"Record absent from {route}: {title}")

    publication_page = pages.get("/publications/")
    if publication_page:
        references = set(publication_page.references)
        for reference in baseline["publication_links"]:
            if reference not in references:
                errors.append(f"Missing publication access link: {reference}")

    home = pages.get("/")
    if home:
        if not any("tailwind" in urlsplit(style).path for style in home.styles):
            errors.append("Homepage does not load the v1 Tailwind stylesheet")
        if not home.scripts:
            errors.append("Homepage has no theme/runtime scripts")
        if not any("search" in urlsplit(script).path for script in home.scripts):
            errors.append("Homepage does not load the enabled search feature")
        if not any("theme" in urlsplit(script).path for script in home.scripts):
            errors.append("Homepage does not load the enabled theme-switching script")

    config = (root / "_config.yml").read_text(encoding="utf8")
    zoom_enabled = re.search(r"^enable_medium_zoom:\s*true\b", config, re.MULTILINE) is not None
    for route in ["/", "/publications/", "/reviews/", "/blog/", "/news/"]:
        page = pages.get(route)
        if page is None:
            continue
        if not any(urlsplit(style).path == "/assets/css/site.css" for style in page.styles):
            errors.append(f"Site-specific stylesheet is missing from {route}")
        if not zoom_enabled:
            continue
        loaders = [attrs for attrs in page.script_attributes if urlsplit(attrs["src"]).path == "/assets/js/site.js"]
        libraries = [attrs for attrs in page.script_attributes if "medium-zoom" in attrs["src"]]
        if len(loaders) != 1:
            errors.append(f"Enabled image zoom requires exactly one local site.js loader on {route}")
        if len(libraries) != 1:
            errors.append(f"Enabled image zoom requires exactly one library script on {route}")
        for attrs in libraries:
            url = attrs["src"]
            if urlsplit(url).scheme != "https" or not re.search(r"medium-zoom@\d+\.\d+\.\d+/", url):
                errors.append(f"Image zoom library is not pinned to an HTTPS release on {route}")
            integrity = attrs.get("integrity", "")
            match = re.fullmatch(r"(sha256|sha384|sha512)-([A-Za-z0-9+/]+=*)", integrity)
            try:
                valid_hash = match and len(base64.b64decode(match[2], validate=True)) == {"sha256": 32, "sha384": 48, "sha512": 64}[match[1]]
            except ValueError:
                valid_hash = False
            if not valid_hash or attrs.get("crossorigin") != "anonymous":
                errors.append(f"Image zoom library lacks a valid SRI hash/crossorigin policy on {route}")
            if "defer" not in attrs:
                errors.append(f"Image zoom library is not deferred on {route}")
        for attrs in loaders:
            if "defer" not in attrs:
                errors.append(f"Local image zoom loader is not deferred on {route}")
        if libraries and loaders and page.scripts.index(libraries[0]["src"]) > page.scripts.index(loaders[0]["src"]):
            errors.append(f"Image zoom initialization precedes its library on {route}")

    for route, page in pages.items():
        for resource in page.scripts + page.styles:
            if resource.startswith("http://"):
                errors.append(f"Insecure executable/style resource on {route}: {resource}")
            if "distill.pub/template.v2.js" in resource:
                errors.append(f"Remote Distill runtime on {route}")
            if "/assets/js/distillpub/" in resource:
                errors.append(f"Unexpected legacy Distill runtime on {route}")
        if any("/al-folio/" in ref for ref in page.references if internal_target(route, ref, baseline["origin"])):
            errors.append(f"Upstream demo baseurl leaked into {route}")

    for resource in baseline["site_assets"]:
        if destination(site, resource) is None:
            errors.append(f"Missing original site asset: {resource}")
    if any((site / "assets/js/distillpub").glob("*.js")):
        errors.append("Unused Distill JavaScript is still delivered in the output")

    missing = missing_links(site, pages, baseline["origin"])
    known = set(baseline["existing_missing_links"])
    errors.extend(f"New broken internal reference: {link}" for link in sorted(missing - known))
    return errors, sorted(missing & known)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site", type=Path, default=Path("_site"))
    arguments = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    baseline = json.loads((Path(__file__).parent / "site_baseline.json").read_text())
    errors, existing = check(arguments.site.resolve(), baseline, root)
    for error in errors:
        print("FAIL:", error)
    for warning in existing:
        print("BASELINE:", warning)
    print(
        f"Checked {len(baseline['routes'])} baseline routes, "
        f"{len(baseline['collection_titles']['_publications'])} publications, "
        f"{len(baseline['collection_titles']['_reviews'])} reviews, and local resources."
    )
    print(f"{len(errors)} regressions; {len(existing)} pre-existing broken references remain.")
    return bool(errors)


if __name__ == "__main__":
    raise SystemExit(main())
