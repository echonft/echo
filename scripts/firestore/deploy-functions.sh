#!/bin/sh

if [ ! "$ENV" ]; then
  ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 2 \
  "development" "Development" \
  "production" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$ENV" = "development" ] || [ "$ENV" = "production" ]; then
  dir=$(cd "$(dirname "$0")" && pwd)
  ENV="$ENV" sh "$dir"/delete-functions.sh
  ENV="$ENV" pnpm exec turbo deploy --filter=@echo/firestore-functions
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
