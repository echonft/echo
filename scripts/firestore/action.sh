#!/bin/sh


ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 7 \
"clear-db" "clear database" \
"delete-functions" "delete functions" \
"deploy-functions" "deploy functions" \
"deploy-indexes" "deploy indexes" \
"pull-indexes" "pull indexes" \
"mirror-staging" "mirror staging" \
"run-migration" "run the latest migration" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "clear-db" ] || [ "$ACTION" = "delete-functions" ] || [ "$ACTION" = "deploy-functions" ] || [ "$ACTION" = "deploy-indexes" ] || [ "$ACTION" = "pull-indexes" ] || [ "$ACTION" = "mirror-staging" ]  || [ "$ACTION" = "run-migration" ]; then
  printf "\e[35mSelected action: %s\n\e[0m" "$ACTION"
  dir=$(cd "$(dirname "$0")" && pwd)
  sh "$dir"/"$ACTION".sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
