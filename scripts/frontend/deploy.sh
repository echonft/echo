#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=staging --nocancel --notags --menu "Pick an environment" 10 30 2 \
"staging" "Staging" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" == "staging" ]; then
  vercel --prod --local-config="${dir}"/../../.vercel/staging.json
elif [ "$ENV" == "production" ]; then
  vercel --prod --local-config="${dir}"/../../.vercel/production.json
else
  exit 1
fi
