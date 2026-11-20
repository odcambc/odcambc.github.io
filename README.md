# Christian B. Macdonald’s website

Personal Jekyll site at <https://odcambc.github.io>, using al-folio’s v1 plugin architecture. The migration references upstream starter revision `fde4cbfa59a8dd5efe0cba90ddf62ebab1fad7f1`.

## Development

Use the repository’s devcontainer, or run:

```sh
docker compose up --build
```

The preview is at <http://localhost:8080/>. To use other local ports:

```sh
JEKYLL_HOST_PORT=8082 JEKYLL_LIVERELOAD_PORT=35731 docker compose up --build
```

The shared Dockerfile provides Ruby 3.4, Node 22, ImageMagick, and notebook conversion tools. Startup installs locked dependencies and builds into container-local `/tmp/odcambc-site`; it does not restore or resolve lockfiles. Configuration changes restart Jekyll. The devcontainer installs the project-local Prettier and Liquid plugin used by the Git hook and CI.

## Site ownership

- `_pages`, `_posts`, `_news`, `_publications`, `_reviews`, `_data`, and personal assets hold site content. Publications and reviews remain Markdown collections.
- `Gemfile` and `_config.yml` select and activate pinned theme plugins. Shared layouts, styles, icons, search, math, and analytics come from those gems.
- `assets/css/site.css` and `assets/js/site.js` contain the small site-specific layout and image-zoom additions. `_plugins/site_styles.rb` loads them without copying the theme’s head template.
- Medium Zoom uses an explicit CDN version and integrity hash. The unused image-gallery plugin is omitted because its downloader dependency requires a vulnerable CSS Parser release.
- CV rendering, Distill, galleries, comments, and other unused feature plugins are not enabled. Existing content routes and the PDF CV asset remain.

The site is a personal GitHub Pages site: `baseurl` must remain empty. Do not copy upstream’s `/al-folio` demo path or example content into the configuration.

## Validation

Run these inside the development container:

```sh
npm ci
npm run lint:prettier
JEKYLL_ENV=production bundle exec jekyll build
npm run test:site -- --site _site
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit
```

The site contract checks existing routes, publication/review records, assets, and internal links. It does not compare page layouts. Page appearance and interactions are reviewed manually.

CI also runs npm and Ruby dependency audits and CodeQL. Pull requests build and validate the site without deployment; deployment occurs only from the main site branch. The owner handles PR approval and merging.

For template/plugin documentation, use the [current upstream documentation](https://github.com/alshedivat/al-folio/tree/main/docs). The older template documents retained in this checkout describe the previous architecture.
