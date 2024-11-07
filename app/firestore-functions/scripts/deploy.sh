#!/bin/sh

if [ "$ENV" = "development" ]; then
  project="echo-dev-fallback"
elif [ "$ENV" = "staging" ]; then
  project="echo-staging-ba121"
elif [ "$ENV" = "production" ]; then
  project="echo-prod-b71e2"
else
  printf "\e[31mWrong ENV\n\e[0m"
  exit 1
fi

printf "\e[36mDeploying firestore functions on %s...\n\e[0m" "$ENV"
firebase use "$ENV" 1>/dev/null
firebase deploy --only functions
sleep 10
gcloud artifacts repositories delete gcf-artifacts --location=us-central1 --project="$project" -q 1>/dev/null 2>&1
printf "\e[32m]\nDone deploying firestore functions on %s\n\e[0m" "$ENV"
