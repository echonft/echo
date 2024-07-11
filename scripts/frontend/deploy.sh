#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=staging --notags --menu "Pick an environment" 10 30 3 \
"dev" "Development" \
"staging" "Staging" \
"echo" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "echo" ]; then
  echo "$ENV" | xargs vercel link -y -p
  vercel --prod
else
  exit 1
fi

