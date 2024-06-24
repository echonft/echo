#!/bin/sh
if [ "${ENV}" == "development" ]; then
  project_id="echo-dev-fallback"
elif [ "${ENV}" == "staging" ]; then
  project_id="echo-staging-ba121"
elif [ "${ENV}" == "production" ]; then
  project_id="echo-prod-b71e2"
else
  >&2 echo "ENV not set"
  exit 1
fi

AUTH_DISCORD_ID=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_ID" --project=${project_id})
AUTH_DISCORD_SECRET=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_SECRET" --project=${project_id})
AUTH_SECRET=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project=${project_id})

if [ "$NEXT_PUBLIC_IS_TESTNET" == "1" ]; then
  network="testnet"
else
  network="mainnet"
fi
echo "Starting frontend development with environment=${ENV} and network=${network}"
sleep 3
ENV=${ENV} \
NEXT_PUBLIC_IS_TESTNET=${NEXT_PUBLIC_IS_TESTNET} \
AUTH_SECRET="${AUTH_SECRET}" \
AUTH_DISCORD_ID="${AUTH_DISCORD_ID}" \
AUTH_DISCORD_SECRET="${AUTH_DISCORD_SECRET}" \
 pnpm exec turbo dev --filter=@echo/frontend --filter=@echo/ui
