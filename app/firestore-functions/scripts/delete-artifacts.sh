#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "$1" == "dev" ]; then
  project="echo-dev-fallback"
elif [ "$1" == "prod" ]; then
  project="echo-prod-b71e2"
else
  exit 1
fi

gcloud artifacts repositories delete gcf-artifacts --location=us-central1 --project=${project} -q
