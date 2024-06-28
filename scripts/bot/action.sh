#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 10 30 4 \
"dev" "dev" \
"deploy" "deploy" \
"restart-machine" "restart machine" \
"start" "start local build" 3>&1 1>&2 2>&3)

if [ "$ACTION" == "dev" ] || [ "$ACTION" == "deploy" ] || [ "$ACTION" == "restart-machine" ] || [ "$ACTION" == "start" ]; then
  sh "${dir}"/"${ACTION}".sh
else
  exit 1
fi

