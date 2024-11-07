#!/bin/sh


ACTION=$(whiptail --default-item=dev --notags --menu "Wat do?" 10 30 4 \
"dev" "dev" \
"deploy" "deploy" \
"restart-machine" "restart machine" \
"start" "start local build" 3>&1 1>&2 2>&3)

if [ "$ACTION" = "dev" ] || [ "$ACTION" = "deploy" ] || [ "$ACTION" = "restart-machine" ] || [ "$ACTION" = "start" ]; then
  dir=$(cd "$(dirname "$0")" && pwd)
  printf "\e[35mSelected action: %s\n\e[0m" "$ACTION"
  sh "$dir"/"$ACTION".sh
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi

