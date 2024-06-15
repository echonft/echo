#!/bin/sh
AUTH_DISCORD_ID=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_ID" --project=echo-dev-fallback)
AUTH_DISCORD_SECRET=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_SECRET" --project=echo-dev-fallback)
AUTH_SECRET=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project=echo-dev-fallback)

ENV=development \
NEXT_PUBLIC_IS_TESTNET=1 \
AUTH_SECRET="${AUTH_SECRET}" \
AUTH_DISCORD_ID="${AUTH_DISCORD_ID}" \
AUTH_DISCORD_SECRET="${AUTH_DISCORD_SECRET}" \
 pnpm exec turbo dev --filter=@echo/frontend --filter=@echo/ui
