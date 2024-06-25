#!/bin/sh

gsutil -m rm -r "gs://echo-firestore-prod-backup/**"
gcloud firestore export gs://echo-firestore-prod-backup/default --project=echo-prod-b71e2
firebase use staging
# Disable exit on error since the db might already have been deleted
set +e
firebase firestore:databases:delete "(default)" --force
sleep 300
firebase firestore:databases:create "(default)" --location=us-central1
# Re-enable exit on error
set -e
gcloud firestore import gs://echo-firestore-prod-backup/default --project=echo-staging-ba121
firebase deploy --only firestore:rules
firebase deploy --only firestore:index
