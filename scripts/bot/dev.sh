#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
  exit 1
fi

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  NODE_ENV=development ENV=${ENV} pnpm exec turbo dev --filter=@echo/bot
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
