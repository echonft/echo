#!/bin/sh

if [ "$ENV" = "development" ]; then
  project_id="echo-dev-fallback"
elif [ "$ENV" = "production" ]; then
  project_id="echo-prod-b71e2"
else
  printf "\e[31mWrong ENV\n\e[0m"
  exit 1
fi

# Get the secrets
AUTH_SECRET=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project="$project_id")
if [ ! "$AUTH_SECRET" ]; then
  printf "\e[31mAUTH_SECRET secret not found\n\e[0m"
  exit 1
fi
SECRET_MANAGER_EMAIL=$(gcloud secrets versions access 'latest' --secret="SECRET_MANAGER_EMAIL" --project="$project_id")
if [ ! "$SECRET_MANAGER_EMAIL" ]; then
  printf "\e[31mSECRET_MANAGER_EMAIL secret not found\n\e[0m"
  exit 1
fi
SECRET_MANAGER_PRIVATE_KEY=$(gcloud secrets versions access 'latest' --secret="SECRET_MANAGER_PRIVATE_KEY" --project="$project_id")
if [ ! "$SECRET_MANAGER_PRIVATE_KEY" ]; then
  printf "\e[31mSECRET_MANAGER_PRIVATE_KEY secret not found\n\e[0m"
  exit 1
fi

# start with the env vars
AUTH_SECRET="$AUTH_SECRET" \
SECRET_MANAGER_EMAIL="$SECRET_MANAGER_EMAIL" \
SECRET_MANAGER_PRIVATE_KEY="$SECRET_MANAGER_PRIVATE_KEY" \
NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL="localhost:3000" \
NODE_ENV="production" \
 next start
