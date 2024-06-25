#!/bin/sh

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=staging --nocancel --notags --menu "Pick an environment" 10 30 2 \
"staging" "Staging" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" == "staging" ]; then
  vercel link -p staging -y
  vercel --prod
elif [ "$ENV" == "production" ]; then
  vercel link -p echo -y
  vercel --prod
else
  >&2 echo "ENV not set"
  exit 1
fi
