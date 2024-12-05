#!/bin/sh

rm_canceled() {
  project="$1"
  VERCEL_PROJECT="$project" sh "$dir"/rm-canceled.sh
}

rm_production() {
  project="$1"
  VERCEL_PROJECT="$project" sh "$dir"/rm-production.sh
}


ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 50 4 \
"rm-canceled" "delete canceled deployments" \
"rm-production" "delete past production deployments" \
"rm-all" "delete canceled + past production deployments" \
"deploy" "deploy" 3>&1 1>&2 2>&3)

dir=$(cd "$(dirname "$0")" && pwd)
if [ "$ACTION" = "rm-canceled" ] || [ "$ACTION" = "rm-production" ] || [ "$ACTION" = "rm-all" ]; then
  VERCEL_PROJECT=$(whiptail --default-item=all --notags --menu "Pick an project" 10 40 3 \
  "all" "All" \
  "dev" "Development" \
  "echo" "Production" 3>&1 1>&2 2>&3)
  if [ "$VERCEL_PROJECT" != "all" ] && [ "$VERCEL_PROJECT" != "dev" ] && [ "$VERCEL_PROJECT" != "echo" ]; then
    printf "\e[31mCanceled\n\e[0m"
    exit 1
  fi
  printf "\e[35mSelected action: %s\n\e[0m" "$ACTION"
  printf "\e[35mSelected project: %s\n\e[0m" "$VERCEL_PROJECT"
  echo "directory: $dir"
  if [ "$ACTION" = "rm-canceled" ]; then
      if [ "$VERCEL_PROJECT" = "all" ]; then
        rm_canceled "dev"
        rm_canceled "echo"
      else
        rm_canceled "$VERCEL_PROJECT"
      fi
  elif [ "$ACTION" = "rm-production" ]; then
    if [ "$VERCEL_PROJECT" = "all" ]; then
      rm_production "dev"
      rm_production "echo"
    else
      rm_production "$VERCEL_PROJECT"
    fi
  else
    if [ "$VERCEL_PROJECT" = "all" ]; then
      rm_canceled "dev"
      rm_production "dev"
      rm_canceled "echo"
      rm_production "echo"
    else
      rm_canceled "$VERCEL_PROJECT"
      rm_production "$VERCEL_PROJECT"
    fi
  fi
elif [ "$ACTION" = "deploy" ]; then
  sh "$dir"/deploy.sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi

