#!/bin/sh

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" 3>&1 1>&2 2>&3)

if [ "$ENV" = "development" ] || [ "$ENV" = "staging" ] || [ "$ENV" = "production" ]; then
  printf "\e[36mClearing %s database...\n\e[0m" "$ENV"
  firebase use "$ENV" 1>/dev/null
  output=$(firebase firestore:databases:delete "(default)" --force)
  if ! echo "$output" | grep -q "^Error:"; then
    printf "\e[35m\nDeleted %s database, waiting 5 minutes...\n\e[0m" "$ENV"
    duration=300
    while [ "$duration" -gt 0 ]
    do
      printf "\e[35m\r%02d:%02d\e[0m" $((duration/60)) $((duration%60))
      sleep 1
      duration=$((duration-1))
    done
  else
    printf "\e[35m\n%s database does not exist, proceeding to creation\n\e[0m" "$ENV"
  fi
  firebase firestore:databases:create "(default)" --location=us-central1 1>/dev/null
  printf "\e[35m\nCreated %s database\n\e[0m" "$ENV"
  firebase deploy --only firestore:index 1>/dev/null
  printf "\e[32m\nDone clearing %s database\n\e[0m" "$ENV"
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi


