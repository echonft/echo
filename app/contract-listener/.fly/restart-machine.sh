#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "$1" == "dev" ]; then
  app="echo-contract-listener-dev"
  machine_id="d8d9365aed97d8"
elif [ "$1" == "prod" ]; then
  app="echo-contract-listener"
  machine_id="d891697f46e008"
else
  exit 1
fi

flyctl machine ${machine_id} restart --app=${app}
