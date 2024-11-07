#!/bin/sh


ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" \
"production" "Production (be careful!)" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  dir=$(cd "$(dirname "$0")" && pwd)
  cd "$dir"/../../app/frontend/ || exit 1
  ENV="$ENV" CI="1" scripts/build.sh
  AUTH_TRUST_HOST=true ENV="$ENV" scripts/start.sh
  cd - || exit 1
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
