#!/bin/sh
auth_discord_id=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_ID" --project=echo-dev-fallback)
auth_discord_secret=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_SECRET" --project=echo-dev-fallback)
auth_secret=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project=echo-dev-fallback)

ENV=development \
NEXT_PUBLIC_IS_TESTNET=1 \
AUTH_SECRET="${auth_secret}" \
AUTH_DISCORD_ID="${auth_discord_id}" \
AUTH_DISCORD_SECRET="${auth_discord_secret}" \
 pnpm exec turbo dev --filter=@echo/frontend --filter=@echo/ui
