#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 8 \
"fetch-collection" "Fetch collection" \
"fetch-nft" "Fetch an NFT" \
"fetch-nfts-for-wallet" "Fetch NFTs for wallet" \
"update-collection" "Update a collection" \
"update-nft" "Update an NFT" \
"update-user-nfts" "Update a user's NFTs" \
"update-wallet-nfts" "Update a wallet's NFTs" \
"update-users-nfts" "Update every users' NFTs" 3>&1 1>&2 2>&3)

pnpm exec turbo command --filter=@echo/tasks -- "${ACTION}"

