#!/bin/sh

if [ "$ENV" = "development" ]; then
  project_id="echo-dev-fallback"
elif [ "$ENV" = "staging" ]; then
  project_id="echo-staging-ba121"
elif [ "$ENV" = "production" ]; then
  project_id="echo-prod-b71e2"
else
  printf "\e[31mWrong ENV\n\e[0m"
  exit 1
fi

AUTH_SECRET=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project="$project_id")
printf "\e[36mStarting frontend development on %s environment\n\e[0m" "$ENV"
sleep 1
ENV="$ENV" \
AUTH_SECRET="$AUTH_SECRET" \
NEXT_PUBLIC_VERCEL_URL="localhost:3000" \
 pnpm exec turbo dev --filter=@echo/frontend --filter=@echo/ui
