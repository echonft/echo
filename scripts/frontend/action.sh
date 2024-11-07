#!/bin/sh

ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 15 30 4 \
"analyze" "analyze" \
"dev" "dev" \
"deploy" "deploy" \
"start" "start local build" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "analyze" ] || [ "$ACTION" = "dev" ] || [ "$ACTION" = "deploy" ] || [ "$ACTION" = "start" ]; then
  printf "\e[35mSelected action: %s\n\e[0m" "$ACTION"
  dir=$(cd "$(dirname "$0")" && pwd)
  sh "$dir"/"$ACTION".sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi

