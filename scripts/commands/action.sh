#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --notags --menu "Wat do?" 15 30 8 \
"fetch-collection" "Fetch a collection" \
"fetch-nft" "Fetch an NFT" \
"fetch-nfts-for-wallet" "Fetch NFTs for wallet" \
"update-collection" "Update a collection" \
"update-nft" "Update an NFT" \
"update-user-nfts" "Update a user's NFTs" \
"update-wallet-nfts" "Update a wallet's NFTs" \
"update-users-nfts" "Update every users' NFTs" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "fetch-collection" ] || [ "$ACTION" = "fetch-nft" ] || [ "$ACTION" = "fetch-nfts-for-wallet" ]; then
  ENV=development pnpm exec turbo command --filter=@echo/tasks -- "${ACTION}"
elif [ "$ACTION" = "update-collection" ] || [ "$ACTION" = "update-nft" ] || [ "$ACTION" = "update-user-nfts" ] || [ "$ACTION" = "update-wallet-nfts" ] || [ "$ACTION" = "update-users-nfts" ]; then
    ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
    "development" "Development" \
    "staging" "Staging" \
    "production" "Production (be careful!)" 3>&1 1>&2 2>&3)
    ENV=${ENV} pnpm exec turbo command --filter=@echo/tasks -- "${ACTION}"
else
  exit 1
fi

