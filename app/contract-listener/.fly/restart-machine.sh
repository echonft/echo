#!/bin/sh
if [ "${ENV}" == "development" ]; then
  app="echo-contract-listener-dev"
  machine_id="d8d9365aed97d8"
elif [ "${ENV}" == "production" ]; then
  app="echo-contract-listener"
  machine_id="d891697f46e008"
else
  >&2 echo "ENV not set"
  exit 1
fi

flyctl machine restart ${machine_id} --app=${app}
