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
"production" "Production (be careful!)" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ]; then
    LOG_LEVEL=$(whiptail --default-item=trace --notags --menu "Pick a log level" 15 30 6 \
    "fatal" "fatal" \
    "error" "error" \
    "warn" "warn" \
    "info" "info" \
    "debug" "debug" \
    "trace" "trace" 3>&1 1>&2 2>&3)
    if [ "$LOG_LEVEL" = "fatal" ] || [ "$LOG_LEVEL" = "error" ] || [ "$LOG_LEVEL" = "warn" ] || [ "$LOG_LEVEL" = "info" ] || [ "$LOG_LEVEL" = "debug" ] || [ "$LOG_LEVEL" = "trace" ]; then
      LOG_LEVEL=${LOG_LEVEL} ENV=${ENV} "${dir}"/../../app/frontend/scripts/dev.sh
    else
      printf "\e[31mCanceled\n\e[0m"
      exit 1
    fi
elif [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  ENV=${ENV} "${dir}"/../../app/frontend/scripts/dev.sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
