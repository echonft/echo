#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "$1" == "dev" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "$1" == "prod" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
else
  exit 1
fi

flyctl machine ${machine_id} restart --app=${app}
