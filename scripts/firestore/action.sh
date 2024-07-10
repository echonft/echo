#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 5 \
"clear-db" "clear database" \
"deploy-functions" "deploy functions" \
"deploy-indexes" "deploy indexes" \
"pull-indexes" "pull indexes" \
"mirror-staging" "mirror staging" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "clear-db" ] || [ "$ACTION" = "deploy-functions" ] || [ "$ACTION" = "deploy-indexes" ] || [ "$ACTION" = "pull-indexes" ] || [ "$ACTION" = "mirror-staging" ]; then
  sh "${dir}"/"${ACTION}".sh
else
  exit 1
fi

"${dir}"/"${ACTION}".sh
