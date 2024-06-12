#!/bin/sh
if [ "${ENV}" == "development" ]; then
  project_id="echo-dev-fallback"
  NEXT_PUBLIC_IS_TESTNET="1"
elif [ "${ENV}" == "staging" ]; then
  project_id="echo-staging-ba121"
  NEXT_PUBLIC_IS_TESTNET="0"
elif [ "${ENV}" == "production" ]; then
  project_id="echo-prod-b71e2"
  NEXT_PUBLIC_IS_TESTNET="0"
else
  >&2 echo "ENV not set"
  exit 1
fi
SECRET_MANAGER_EMAIL=$(gcloud secrets versions access 'latest' --secret="SECRET_MANAGER_EMAIL" --project=${project_id})
if [ ! "${SECRET_MANAGER_EMAIL}" ]; then
  >&2 echo "SECRET_MANAGER_EMAIL secret not found"
  exit 1
fi
SECRET_MANAGER_PRIVATE_KEY=$(gcloud secrets versions access 'latest' --secret="SECRET_MANAGER_PRIVATE_KEY" --project=${project_id})
if [ ! "${SECRET_MANAGER_PRIVATE_KEY}" ]; then
  >&2 echo "SECRET_MANAGER_PRIVATE_KEY secret not found"
  exit 1
fi

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
node "${dir}/../dist/index.js"
