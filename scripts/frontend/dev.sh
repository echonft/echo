#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" \
"production" "Production (be careful!)" 3>&1 1>&2 2>&3)

if [ "$ENV" == "development" ]; then
  NEXT_PUBLIC_IS_TESTNET=$(whiptail --default-item=1 --notags --menu "Pick an network" 10 30 2 \
  "0" "mainnet" \
  "1" "testnet" 3>&1 1>&2 2>&3)
  if [ "$NEXT_PUBLIC_IS_TESTNET" == "0" ] || [ "$NEXT_PUBLIC_IS_TESTNET" == "1" ]; then
    ENV=${ENV} NEXT_PUBLIC_IS_TESTNET=${NEXT_PUBLIC_IS_TESTNET} "${dir}"/../../app/frontend/scripts/dev.sh
  else
    exit 1
  fi
elif [ "$ENV" == "staging" ] || [ "$ENV" == "production" ]; then
  ENV=${ENV} NEXT_PUBLIC_IS_TESTNET=0 "${dir}"/../../app/frontend/scripts/dev.sh
else
  exit 1
fi
