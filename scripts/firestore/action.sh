#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 5 \
"clear-db" "clear database" \
"deploy-functions" "deploy functions" \
"deploy-indexes" "deploy indexes" \
"pull-indexes" "pull indexes" \
"mirror-staging" "mirror staging" 3>&1 1>&2 2>&3)

"${dir}"/"${ACTION}".sh
