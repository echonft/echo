#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

if [ ! "$ENV" ]; then
  ENV=$(whiptail --default-item=staging --notags --menu "Pick an environment" 10 30 3 \
  "dev" "Development" \
  "staging" "Staging" \
  "echo" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "echo" ]; then
  vercel link -y -p "$ENV" 1>/dev/null 2>&1
  vercel --prod
else
  exit 1
fi

