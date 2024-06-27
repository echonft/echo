#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" 3>&1 1>&2 2>&3)

firebase use "${ENV}"
firebase firestore:databases:delete "(default)" --force
sleep 300
firebase firestore:databases:create "(default)" --location=us-central1
firebase deploy --only firestore:rules
firebase deploy --only firestore:index
