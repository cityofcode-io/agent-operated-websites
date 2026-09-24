#!/bin/sh
# Usage: ./lighthouse.sh <url> [name]
# Three Lighthouse runs per device into a new timestamped directory, then the medians.
set -eu
audit_url="${1:?Usage: ./lighthouse.sh <url> [name]}"
name="${2:-home}"
out="reports/$(date -u +%Y%m%dT%H%M%SZ)"
mkdir -p reports
mkdir "$out"
for run in 1 2 3; do
  for device in mobile desktop; do
    preset=''
    [ "$device" = desktop ] && preset='--preset=desktop'
    npx lighthouse "$audit_url" $preset --chrome-flags="--headless" \
      --only-categories=performance,accessibility,best-practices,seo \
      --output=json --output=html --output-path="$out/$name-$device-$run" \
      --no-enable-error-reporting --quiet || echo "failed: $name-$device-$run"
  done
done
echo "reports: $out"
node "$(dirname "$0")/medians.mjs" "$out"
