#!/bin/sh

if [ "$ENV" = "development" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "$ENV" = "production" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
else
  printf "\e[31mWrong ENV\n\e[0m"
  exit 1
fi

printf "\e[36mRestarting bot machine on %s...\n\e[0m" "$ENV"
flyctl machines restart "$machine_id" --app="$app"
printf "\e[32m]\nDone restarting bot machine on %s\n\e[0m" "$ENV"
