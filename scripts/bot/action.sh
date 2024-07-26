#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
  exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 10 30 4 \
"dev" "dev" \
"deploy" "deploy" \
"restart-machine" "restart machine" \
"start" "start local build" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "dev" ] || [ "$ACTION" = "deploy" ] || [ "$ACTION" = "restart-machine" ] || [ "$ACTION" = "start" ]; then
  printf "\e[35mSelected action: %s\n\e[0m" "${ACTION}"
  sh "${dir}"/"${ACTION}".sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi

