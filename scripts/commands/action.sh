#!/bin/sh

# Get action
ACTION=$(whiptail --notags --menu "Wat do?" 15 30 7 \
"fetch-collection" "Fetch a collection" \
"fetch-collection-nfts" "Fetch a collection's NFTs" \
"fetch-nft" "Fetch an NFT" \
"fetch-nfts-for-wallet" "Fetch NFTs for wallet" \
"update-user-nfts" "Update a user's NFTs" \
"update-wallet-nfts" "Update a wallet's NFTs" \
"update-users-nfts" "Update every users' NFTs" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "fetch-collection" ]  || [ "$ACTION" = "fetch-collection-nfts" ] || [ "$ACTION" = "fetch-nft" ] || [ "$ACTION" = "fetch-nfts-for-wallet" ]; then
  ENV=development pnpm exec turbo command --filter=@echo/tasks -- "$ACTION"
elif [ "$ACTION" = "update-collection" ] || [ "$ACTION" = "update-user-nfts" ] || [ "$ACTION" = "update-wallet-nfts" ] || [ "$ACTION" = "update-users-nfts" ]; then
    # Get env
    ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
    "development" "Development" \
    "staging" "Staging" \
    "production" "Production (be careful!)" 3>&1 1>&2 2>&3)
    if [ "$ENV" = "development" ]; then
      NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL="dev.echonft.xyz"
    elif [ "$ENV" = "staging" ]; then
      NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL="staging.echonft.xyz"
    elif [ "$ENV" = "production" ]; then
      NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL="app.echonft.xyz"
    else
      printf "\e[31mCanceled\n\e[0m"
      exit 1
    fi
    # Get log level
    LOG_LEVEL=$(whiptail --default-item=trace --notags --menu "Pick a log level" 15 30 6 \
    "fatal" "fatal" \
    "error" "error" \
    "warn" "warn" \
    "info" "info" \
    "debug" "debug" \
    "trace" "trace" 3>&1 1>&2 2>&3)
    if [ "$LOG_LEVEL" = "fatal" ] || [ "$LOG_LEVEL" = "error" ] || [ "$LOG_LEVEL" = "warn" ] || [ "$LOG_LEVEL" = "info" ] || [ "$LOG_LEVEL" = "debug" ] || [ "$LOG_LEVEL" = "trace" ]; then
      printf "\e[35mSelected command: %s\n\e[0m" "$ACTION"
      printf "\e[35mSelected environment: %s\n\e[0m" "$ENV"
      printf "\e[35mSelected log level: %s\n\e[0m" "$LOG_LEVEL"
      LOG_LEVEL="$LOG_LEVEL" ENV="$ENV" NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL=${NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL} pnpm exec turbo command --filter=@echo/tasks -- "$ACTION"
    else
      printf "\e[31mCanceled\n\e[0m"
      exit 1
    fi
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi

