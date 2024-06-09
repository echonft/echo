#!/bin/sh
if [ "${ENV}" == "development" ]; then
  project="echo-dev-fallback"
elif [ "${ENV}" == "production" ]; then
  project="echo-prod-b71e2"
else
  >&2 echo "ENV not set"
  exit 1
fi

gcloud artifacts repositories delete gcf-artifacts --location=us-central1 --project=${project} -q
