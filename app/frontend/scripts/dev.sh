#!/bin/sh

AUTH_SECRET=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project="echo-dev-fallback")
ENV="$ENV" \
AUTH_SECRET="$AUTH_SECRET" \
NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL="localhost:3000" \
pnpm exec turbo dev --filter=@echo/frontend --filter=@echo/ui
