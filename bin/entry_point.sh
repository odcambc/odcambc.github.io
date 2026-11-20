#!/usr/bin/env bash
set -euo pipefail

CONFIG_FILE=${JEKYLL_CONFIG:-_config.yml}
SITE_DESTINATION=${JEKYLL_DESTINATION:-/tmp/odcambc-site}
SITE_PORT=${JEKYLL_PORT:-8080}
jekyll_pid=""

cleanup() {
    if [ -n "$jekyll_pid" ] && kill -0 "$jekyll_pid" 2>/dev/null; then
        kill -TERM "$jekyll_pid" 2>/dev/null || true
        wait "$jekyll_pid" 2>/dev/null || true
    fi
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

if [ ! -f "$CONFIG_FILE" ]; then
    echo "Run the preview from the website root; missing $CONFIG_FILE." >&2
    exit 1
fi

# A preview must never restore, delete, or silently resolve the tracked lockfile.
if ! bundle check; then
    BUNDLE_FROZEN=true bundle install --jobs 4 --retry 3
fi
npm ci --prefer-offline
mkdir -p "$SITE_DESTINATION"

start_jekyll() {
    bundle exec jekyll serve --watch --port="$SITE_PORT" --host=0.0.0.0 \
        --livereload --force_polling --destination "$SITE_DESTINATION" \
        --config "$CONFIG_FILE" &
    jekyll_pid=$!
}

start_jekyll
config_signature=$(cksum < "$CONFIG_FILE")

# Docker Desktop bind mounts do not reliably deliver inotify close-write events.
# Poll the config checksum, tolerating editors that replace the file atomically.
while kill -0 "$jekyll_pid" 2>/dev/null; do
    sleep 2
    if [ ! -f "$CONFIG_FILE" ]; then
        continue
    fi
    if next_signature=$(cksum < "$CONFIG_FILE") && [ "$next_signature" != "$config_signature" ]; then
        cleanup
        config_signature=$next_signature
        start_jekyll
    fi
done

wait "$jekyll_pid"
