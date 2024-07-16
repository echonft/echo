#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

if [ ! "$ENV" ]; then
  ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
  "development" "Development" \
  "staging" "Staging" \
  "production" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  ENV=${ENV} "${dir}"/../../app/bot/scripts/deploy.sh
else
  exit 1
fi
