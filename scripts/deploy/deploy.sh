#!/bin/sh

deploy_firestore_functions() {
  local_env="$1"
  ENV=${local_env} sh "${dir}"/../firestore/deploy-functions.sh
}

deploy_bot() {
  local_env="$1"
  ENV=${local_env} sh "${dir}"/../bot/deploy.sh
}

deploy_frontend() {
  local_env="$1"
  ENV=${local_env} sh "${dir}"/../frontend/deploy.sh
}

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

ENV=$(whiptail --default-item=staging --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" \
"production" "Production" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  DEPLOYMENTS=$(whiptail --notags --checklist "Deploy what?" 10 30 4 \
  "all" "Everything below" "1" \
  "bot" "Bot" "0"\
  "frontend" "Frontend" "0"\
  "firestore" "Firestore functions" "0" 3>&1 1>&2 2>&3)
  if [ ! "$DEPLOYMENTS" ]; then
    exit 1
  fi
  # if env is staging or production (since we deploy staging also), we always need to mirror prod
  if [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
    sh "${dir}"/../firestore/mirror-staging.sh
  fi

  for DEPLOYMENT in ${DEPLOYMENTS}
  do
    if [ "$DEPLOYMENT" = "all" ]; then
      deploy_firestore_functions "$ENV"
      deploy_bot "$ENV"
      deploy_frontend "$ENV"
      # deploy on staging too if deploying on production
      if [ "$ENV" = "production" ]; then
        deploy_firestore_functions "staging"
        deploy_bot "staging"
        deploy_frontend "staging"
      fi
    elif [ "$DEPLOYMENT" = "bot" ]; then
      deploy_bot "$ENV"
      # deploy on staging too if deploying on production
      if [ "$ENV" = "production" ]; then
        deploy_bot "staging"
      fi
    elif [ "$DEPLOYMENT" = "frontend" ]; then
      deploy_frontend "$ENV"
      # deploy on staging too if deploying on production
      if [ "$ENV" = "production" ]; then
        deploy_frontend "staging"
      fi
    elif [ "$DEPLOYMENT" = "firestore" ]; then
      deploy_firestore_functions "$ENV"
      # deploy on staging too if deploying on production
      if [ "$ENV" = "production" ]; then
        deploy_firestore_functions "staging"
      fi
    fi
  done
else
  exit 1
fi
