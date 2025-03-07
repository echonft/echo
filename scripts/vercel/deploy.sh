#!/bin/sh

VERCEL_PROJECT=$(whiptail --default-item=dev --notags --menu "Pick an project" 10 30 2 \
"dev" "Development" \
"echo" "Production" 3>&1 1>&2 2>&3)

if [ "$VERCEL_PROJECT" = "dev" ] || [ "$VERCEL_PROJECT" = "echo" ]; then
  printf "\e[36mDeploying project %s...\n\e[0m" "$VERCEL_PROJECT"
  vercel link -y -p "$VERCEL_PROJECT" 1>/dev/null 2>&1
  vercel --prod
  printf "\e[32m\nDone deploying project %s\n\e[0m" "$VERCEL_PROJECT"
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
