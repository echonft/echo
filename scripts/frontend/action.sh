#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 4 \
"analyze" "analyze" \
"dev" "dev" \
"deploy" "deploy" \
"start" "start local build" 3>&1 1>&2 2>&3)

sh "${dir}"/"${ACTION}".sh

