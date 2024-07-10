#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  firebase use "${ENV}"
  firebase firestore:databases:delete "(default)" --force
  sleep 300
  firebase firestore:databases:create "(default)" --location=us-central1
  firebase deploy --only firestore:rules
  firebase deploy --only firestore:index
else
  exit 1
fi


