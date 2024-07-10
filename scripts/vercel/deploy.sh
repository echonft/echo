#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

VERCEL_PROJECT=$(whiptail --default-item=staging --notags --menu "Pick an project" 10 30 4 \
"dev" "Development" \
"staging" "Staging" \
"production" "Production" \
"storybook" "Storybook" 3>&1 1>&2 2>&3)

if [ "$VERCEL_PROJECT" = "dev" ] || [ "$VERCEL_PROJECT" = "staging" ] || [ "$VERCEL_PROJECT" = "echo" ] || [ "$VERCEL_PROJECT" = "storybook" ]; then
  echo "$ENV" | xargs vercel link -y -p
  vercel --prod
else
  exit 1
fi
