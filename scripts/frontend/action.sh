#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 4 \
"analyze" "analyze" \
"dev" "dev" \
"deploy" "deploy" \
"start" "start local build" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "analyze" ] || [ "$ACTION" = "dev" ] || [ "$ACTION" = "deploy" ] || [ "$ACTION" = "start" ]; then
  sh "${dir}"/"${ACTION}".sh
else
  exit 1
fi

