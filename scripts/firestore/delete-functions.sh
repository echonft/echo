#!/bin/sh

if [ ! "$ENV" ]; then
  ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
  "development" "Development" \
  "staging" "Staging" \
  "production" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  dir=$(cd "$(dirname "$0")" && pwd)
  printf "\e[36mDeleting functions on %s...\n\e[0m" "$ENV"
  firebase use "$ENV" 1>/dev/null
  for file in "$dir"/../../app/firestore-functions/src/functions/*.ts; do
    filename=$(basename "$file" .ts)
    camelCase=$(echo "$filename" | perl -pe 's/-(.)/\u$1/g')
    output=$(firebase functions:delete "$camelCase" --force)
    if echo "$output" | grep -q "^Error:"; then
      printf "\e[32m\nFunction %s not found on %s, skipping\n\e[0m" "$camelCase" "$ENV"
    else
      printf "\e[32m\nDeleted function %s on %s\n\e[0m" "$camelCase" "$ENV"
    fi
  done
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi



