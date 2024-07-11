#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 50 3 \
"rm-canceled" "delete canceled deployments" \
"rm-production" "delete old production deployments" \
"deploy" "deploy" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "rm-canceled" ] || [ "$ACTION" = "rm-production" ]; then
  VERCEL_PROJECT=$(whiptail --default-item=all --notags --menu "Pick an project" 10 40 5 \
  "all" "All" \
  "dev" "Development" \
  "staging" "Staging" \
  "echo" "Production" \
  "storybook" "Storybook" 3>&1 1>&2 2>&3)
  if [ "$VERCEL_PROJECT" = "all" ]; then
    VERCEL_PROJECT=dev sh "${dir}"/"${ACTION}".sh
    VERCEL_PROJECT=staging sh "${dir}"/"${ACTION}".sh
    VERCEL_PROJECT="echo" sh "${dir}"/"${ACTION}".sh
    VERCEL_PROJECT=storybook sh "${dir}"/"${ACTION}".sh
  elif [ "$VERCEL_PROJECT" = "dev" ] || [ "$VERCEL_PROJECT" = "staging" ]|| [ "$VERCEL_PROJECT" = "echo" ]|| [ "$VERCEL_PROJECT" = "storybook" ]; then
    VERCEL_PROJECT=${VERCEL_PROJECT} sh "${dir}"/"${ACTION}".sh
  else
    exit 1
  fi
elif [ "$ACTION" = "deploy" ]; then
  sh "${dir}"/deploy.sh
else
  exit 1
fi

