#!/bin/sh
if [ "${ENV}" == "development" ]; then
  project="echo-dev-fallback"
elif [ "${ENV}" == "staging" ]; then
  project="echo-staging-ba121"
elif [ "${ENV}" == "production" ]; then
  project="echo-prod-b71e2"
else
  >&2 echo "ENV not set"
  exit 1
fi


firebase use "${ENV}"
firebase deploy --only firestore:functions
sleep 10
gcloud artifacts repositories delete gcf-artifacts --location=us-central1 --project=${project} -q


