#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 10 30 2 \
"dev" "dev" \
"deploy" "deploy" 3>&1 1>&2 2>&3)

sh "${dir}"/"${ACTION}".sh
