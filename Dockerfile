FROM node:22-bookworm-slim AS node
FROM ruby:3.4-slim-bookworm

ENV DEBIAN_FRONTEND=noninteractive \
    EXECJS_RUNTIME=Node \
    JEKYLL_ENV=development \
    LANG=C.UTF-8 \
    PYTHONUNBUFFERED=1 \
    PATH="/opt/jekyll-python/bin:${PATH}"

COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential ca-certificates curl git imagemagick inotify-tools \
        procps python3-pip python3-venv zlib1g-dev \
    && rm -rf /var/lib/apt/lists/* \
    && ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \
    && python3 -m venv /opt/jekyll-python \
    && pip install --no-cache-dir nbconvert \
    && useradd --create-home --shell /bin/bash --uid 1000 vscode \
    && mkdir -p /srv/jekyll \
    && chown vscode:vscode /srv/jekyll

WORKDIR /srv/jekyll
COPY Gemfile Gemfile.lock ./
RUN BUNDLE_FROZEN=true bundle install --jobs 4 --retry 3

COPY bin/entry_point.sh /usr/local/bin/site-preview
RUN chmod +x /usr/local/bin/site-preview \
    && mkdir -p /srv/jekyll/node_modules \
    && chown vscode:vscode /srv/jekyll/node_modules

EXPOSE 8080 35729
USER vscode
CMD ["/usr/local/bin/site-preview"]
