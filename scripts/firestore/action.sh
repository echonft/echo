#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
  exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 6 \
"clear-db" "clear database" \
"deploy-functions" "deploy functions" \
"deploy-indexes" "deploy indexes" \
"pull-indexes" "pull indexes" \
"mirror-staging" "mirror staging" \
"run-migration" "run the latest migration" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "clear-db" ] || [ "$ACTION" = "deploy-functions" ] || [ "$ACTION" = "deploy-indexes" ] || [ "$ACTION" = "pull-indexes" ] || [ "$ACTION" = "mirror-staging" ]  || [ "$ACTION" = "run-migration" ]; then
  printf "\e[35mSelected action: %s\n\e[0m" "${ACTION}"
  sh "${dir}"/"${ACTION}".sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
