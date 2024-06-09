#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "${ENV}" == "development" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "${ENV}" == "production" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
else
  exit 1
fi

flyctl machines restart ${machine_id} --app=${app}
