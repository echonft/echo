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
  printf "\e[36mClearing database of %s...\n\e[0m" "${ENV}"
  firebase use "${ENV}"
#  firebase firestore:databases:delete "(default)" --force
#  printf "\e[35m\nDeleted % database, waiting 2 minutes...\n\e[0m" "${ENV}"
#  # Re-enable exit on error
#  set -e
#  duration=120
#  while [ "$duration" -gt 0 ]
#  do
#    printf "\e[35m\r%02d:%02d\e[0m" $((duration/60)) $((duration%60))
#    sleep 1
#    duration=$((duration-1))
#  done
#  sleep 300
  firebase firestore:databases:create "(default)" --location=us-central1
  firebase deploy --only firestore:rules
  firebase deploy --only firestore:index
  printf "\e[32m\nDone clearing database of %s...\n\e[0m" "${ENV}"
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi


