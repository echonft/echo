#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

if [ ! "$ENV" ]; then
  VERLCEL_PROJECT=$(whiptail --default-item=staging --notags --menu "Pick an environment" 10 30 3 \
  "dev" "Development" \
  "staging" "Staging" \
  "echo" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$VERLCEL_PROJECT" = "dev" ] || [ "$VERLCEL_PROJECT" = "staging" ] || [ "$VERLCEL_PROJECT" = "echo" ]; then
  vercel link -y -p "$VERLCEL_PROJECT" 1>/dev/null 2>&1
  vercel --prod
else
  exit 1
fi

