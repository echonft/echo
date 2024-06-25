#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=development --nocancel --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" == "development" ] || [ "$ENV" == "staging" ] || [ "$ENV" == "production" ]; then
  ENV=${ENV} "${dir}"/../../app/bot/scripts/deploy.sh
else
  >&2 echo "ENV not set"
  exit 1
fi
