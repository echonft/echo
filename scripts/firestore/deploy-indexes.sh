#!/bin/sh

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 2 \
"development" "Development" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "production" ]; then
  printf "\e[36mDeploying Firestore indexes to %s...\n\e[0m" "$ENV"
  firebase use "$ENV"
  firebase deploy --only firestore:indexes
  printf "\e[32m\nDone deploying Firestore indexes to %s...\n\e[0m" "$ENV"
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
