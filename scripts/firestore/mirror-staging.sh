#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
  exit 1
fi

printf "\e[36mMirroring staging database...\n\e[0m"
# deleting current database
firebase use staging 1>/dev/null
# Disable exit on error since the db might already have been deleted
set +e
gsutil -m rm -r "gs://echo-firestore-prod-backup/**" 1>/dev/null
firebase firestore:databases:delete "(default)" --force 1>/dev/null
printf "\e[35m\nDeleted staging database, waiting 4 minutes...\n\e[0m"
# Re-enable exit on error
set -e
duration=240
while [ "$duration" -gt 0 ]
do
  printf "\e[35m\r%02d:%02d\e[0m" $((duration/60)) $((duration%60))
  sleep 1
  duration=$((duration-1))
done
# Getting production database
firebase use production 1>/dev/null
firebase firestore:indexes > "${dir}"/../../firestore.indexes.json
printf "\e[35m\nPulled indexes from production\n\e[0m"
gcloud firestore export gs://echo-firestore-prod-backup/default --project=echo-prod-b71e2 1>/dev/null
printf "\e[35m\nExported production database to bucket\n\e[0m"
# Creating staging database and importing
firebase use staging 1>/dev/null
firebase firestore:databases:create "(default)" --location=us-central1 1>/dev/null
printf "\e[35m\nCreated staging database\n\e[0m"
gcloud firestore import gs://echo-firestore-prod-backup/default --project=echo-staging-ba121 1>/dev/null
printf "\e[35m\nImported production database to staging database\n\e[0m"
firebase deploy --only firestore:index 1>/dev/null
printf "\e[35m\nDeployed production indexes to staging database\n\e[0m"
printf "\e[32mDone mirroring staging database\n\e[0m"
