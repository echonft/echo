#!/bin/sh
if [ "${ENV}" == "development" ]; then
  project_id="echo-dev-fallback"
elif [ "${ENV}" == "staging" ]; then
  project_id="echo-staging-ba121"
elif [ "${ENV}" == "production" ]; then
  project_id="echo-prod-b71e2"
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

dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
SECRET_MANAGER_EMAIL=${SECRET_MANAGER_EMAIL} \
SECRET_MANAGER_PRIVATE_KEY=${SECRET_MANAGER_PRIVATE_KEY} \
NODE_ENV=production \
ENV=${ENV} node "${dir}"/../dist/index.js | pino-pretty -c
