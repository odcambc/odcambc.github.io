# lint-frontmatter-urls.awk
#
# Flags `url:` values inside a top-level `links:` block of Jekyll YAML
# frontmatter that lack an absolute scheme. The publications template renders
# links as <a href="{{ link.url }}"> verbatim, so a bare value like
# "pimentellab.com" resolves RELATIVE to the page (/publications/pimentellab.com)
# and 404s — exactly the break that fails broken-links-site.yml in CI.
#
# Scoped to the `links:` block on purpose: `github:` urls are intentionally
# bare "owner/repo" slugs (the template prepends https://www.github.com/), so
# they must NOT be flagged.
#
# Exit 0 = clean, 1 = at least one bad url found. Run as:
#   awk -f lint-frontmatter-urls.awk file1.md file2.md ...

# Reset per-file state (FNR resets to 1 at the start of each input file).
FNR == 1 { seen_open = 0; in_fm = 0; key = "" }

{
  line = $0

  # Frontmatter is delimited by the first two `---` fences. Process only between
  # them; stop at the closing fence.
  if (line ~ /^---[ \t]*$/) {
    if (seen_open == 0) { seen_open = 1; in_fm = 1 }
    else               { in_fm = 0 }
    next
  }
  if (!in_fm) next

  # A line starting in column 1 with `<name>:` is a new top-level key. Track it
  # so we know which block (links:, github:, ...) the indented lines belong to.
  if (line ~ /^[A-Za-z0-9_-]+[ \t]*:/) {
    key = line
    sub(/[ \t]*:.*$/, "", key)
    next
  }

  # Inside a links: block, validate each `url:` (possibly as a list item `- url:`).
  if (key == "links" && line ~ /^[ \t]*-?[ \t]*url[ \t]*:/) {
    v = line
    sub(/^[ \t]*-?[ \t]*url[ \t]*:[ \t]*/, "", v)   # drop everything up to the value
    sub(/[ \t]+$/, "", v)                            # trailing whitespace
    sub(/^"/, "", v); sub(/"$/, "", v)               # surrounding double quotes
    sub(/^'/, "", v); sub(/'$/, "", v)               # or single quotes

    if (v == "") next                                # empty — nothing to check

    # ── Allowed prefixes (the knob): a url is OK if it starts with any of these.
    if (v ~ /^https?:\/\//) next                     # absolute http(s)
    if (v ~ /^\//)          next                     # site-root-relative
    if (v ~ /^#/)           next                     # in-page anchor
    if (v ~ /^mailto:/)     next                     # email
    if (v ~ /^\{\{/ || v ~ /^\{%/) next              # liquid-templated, can't judge
    # ────────────────────────────────────────────────────────────────────────

    printf("%s:%d: links url missing scheme -> %s\n", FILENAME, FNR, v)
    bad = 1
  }
}

END { exit bad ? 1 : 0 }
