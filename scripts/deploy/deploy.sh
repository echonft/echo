#!/bin/sh

deploy_firestore_functions() {
  local_env="$1"
  ENV="$local_env" sh "$dir"/../firestore/deploy-functions.sh
}

deploy_bot() {
  local_env="$1"
  ENV="$local_env" sh "$dir"/../bot/deploy.sh
}

deploy_frontend() {
  local_env="$1"
  ENV=${local_env} sh "$dir"/../frontend/deploy.sh
}

ENV=$(whiptail --default-item=staùging --notags --menu "Pick an environment" 10 30 2 \
"development" "Development" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "production" ]; then
  DEPLOYMENTS=$(whiptail --notags --checklist "Deploy what?" 10 30 4 \
  "all" "Everything below" ON \
  "bot" "Bot" OFF\
  "frontend" "Frontend" OFF\
  "firestore" "Firestore functions" OFF 3>&1 1>&2 2>&3)
  if [ ! "$DEPLOYMENTS" ]; then
    printf "\e[31mCanceled\n\e[0m"
    exit 1
  fi

  printf "\e[35mSelected environment: %s\n\e[0m" "$ENV"
  printf "\e[35mSelected targets: %s\n\e[0m" "$DEPLOYMENTS"
  dir=$(cd "$(dirname "$0")" && pwd)

  for deployment in ${DEPLOYMENTS}
  do
    DEPLOYMENT=$(echo "$deployment" | tr -d '"')
    if [ "$DEPLOYMENT" = "all" ]; then
      deploy_firestore_functions "$ENV"
      deploy_bot "$ENV"
      deploy_frontend "$ENV"
    elif [ "$DEPLOYMENT" = "bot" ]; then
      deploy_bot "$ENV"
    elif [ "$DEPLOYMENT" = "frontend" ]; then
      deploy_frontend "$ENV"
    elif [ "$DEPLOYMENT" = "firestore" ]; then
      deploy_firestore_functions "$ENV"
    fi
  done
  exit 0
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
