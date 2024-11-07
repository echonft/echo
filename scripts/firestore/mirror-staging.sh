#!/bin/sh

printf "\e[36mMirroring staging database...\n\e[0m"
# deleting current database
firebase use staging 1>/dev/null
gsutil -m rm -r "gs://echo-firestore-prod-backup/**" 1>/dev/null
output=$(firebase firestore:databases:delete "(default)" --force)
if ! echo "$output" | grep -q "^Error:"; then
  printf "\e[35m\nDeleted staging database, waiting 5 minutes...\n\e[0m"
  duration=300
  while [ "$duration" -gt 0 ]
  do
    printf "\e[35m\r%02d:%02d\e[0m" $((duration/60)) $((duration%60))
    sleep 1
    duration=$((duration-1))
  done
else
  printf "\e[35m\nStaging database not found, proceeding to creation\n\e[0m"
fi
# Getting production database
firebase use production 1>/dev/null
dir=$(cd "$(dirname "$0")" && pwd)
firebase firestore:indexes > "$dir"/../../firestore.indexes.json
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
