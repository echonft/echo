#!/bin/sh

if [ ! "$ENV" ]; then
  ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
  "development" "Development" \
  "staging" "Staging" \
  "production" "Production" 3>&1 1>&2 2>&3)
fi

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  if [ "$ENV" = "development" ]; then
    VERLCEL_PROJECT="dev"
  elif [ "$ENV" = "staging" ]; then
    VERLCEL_PROJECT="staging"
  else
    VERLCEL_PROJECT="echo"
  fi
  printf "\e[36mDeploying frontend on %s...\n\e[0m" "$ENV"
  vercel link -y -p "$VERLCEL_PROJECT" 1>/dev/null 2>&1
  vercel --prod
  printf "\n\e[32m\nDone deploying frontend on %s\n\e[0m" "$ENV"
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi

