#!/bin/sh
if [ "${ENV}" == "development" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "${ENV}" == "production" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
else
  >&2 echo "ENV not set"
  exit 1
fi

flyctl machines restart ${machine_id} --app=${app}
