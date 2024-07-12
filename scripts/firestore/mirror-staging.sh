#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
    exit 1
fi

# deleting current database
firebase use staging 1>/dev/null
# Disable exit on error since the db might already have been deleted
set +e
gsutil -m rm -r "gs://echo-firestore-prod-backup/**" 1>/dev/null
firebase firestore:databases:delete "(default)" --force 1>/dev/null
echo "deleted staging database, waiting 5 minutes..."
# Re-enable exit on error
set -e
sleep 300
# Getting production database
firebase use production 1>/dev/null
firebase firestore:indexes > "${dir}"/../../firestore.indexes.json
echo "pulled indexes from production"
gcloud firestore export gs://echo-firestore-prod-backup/default --project=echo-prod-b71e2 1>/dev/null
echo "exported production database to bucket"
# Creating staging database and importing
firebase use staging 1>/dev/null
firebase firestore:databases:create "(default)" --location=us-central1 1>/dev/null
echo "created staging database"
gcloud firestore import gs://echo-firestore-prod-backup/default --project=echo-staging-ba121 1>/dev/null
echo "imported production database to staging database"
firebase deploy --only firestore:index 1>/dev/null
echo "deployed production indexes to staging database"
