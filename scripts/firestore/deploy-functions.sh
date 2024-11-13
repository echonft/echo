#!/bin/sh

if [ ! "$ENV" ]; then
  ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
  "development" "Development" \
  "staging" "Staging" \
  "production" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
#  if [ "$ENV" = "development" ]; then
#    project_id="echo-dev-fallback"
#  elif [ "$ENV" = "staging" ]; then
#    project_id="echo-staging-ba121"
#  else
#    project_id="echo-prod-b71e2"
#  fi

  dir=$(cd "$(dirname "$0")" && pwd)
  ENV="$ENV" sh "$dir"/delete-functions.sh
  ENV="$ENV" pnpm exec turbo deploy --filter=@echo/firestore-functions
#  printf "\e[36mSetting secrets...\n\e[0m"
#  SECRET_MANAGER_EMAIL=$(gcloud secrets versions access 'latest' --secret="SECRET_MANAGER_EMAIL" --project="$project_id")
#  SECRET_MANAGER_PRIVATE_KEY=$(gcloud secrets versions access 'latest' --secret="SECRET_MANAGER_PRIVATE_KEY" --project="$project_id")
#  for file in "$dir"/../../app/firestore-functions/src/functions/*.ts; do
#    filename=$(basename "$file" .ts)
#    camelCase=$(echo "$filename" | perl -pe 's/-(.)/\u$1/g')
#    output=$(gcloud functions deploy "$camelCase" --update-env-vars SECRET_MANAGER_EMAIL="$SECRET_MANAGER_EMAIL",SECRET_MANAGER_PRIVATE_KEY="$SECRET_MANAGER_PRIVATE_KEY")
#    if echo "$output" | grep -q "^Failed"; then
#      printf "\e[31m\nCould not set secrets for %s function\n\e[0m" "$camelCase"
#    else
#      printf "\e[32m\nSet secrets for %s function\n\e[0m" "$camelCase"
#    fi
#  done
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
