#!/bin/sh

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 4 \
"development" "Development" \
"staging" "Staging" \
"production" "Production" \
"test" "Test" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ] || [ "$ENV" = "test" ]; then
  printf "\e[36mPulling Firestore indexes from %s...\n\e[0m" "$ENV"
  firebase use "$ENV"
  dir=$(cd "$(dirname "$0")" && pwd)
  firebase firestore:indexes > "$dir"/../../firestore.indexes.json
  printf "\e[32m\nDone pulling Firestore indexes from %s\n\e[0m" "$ENV"
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
