#!/bin/sh

if [ "$ENV" = "development" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
  config_file="fly.dev.toml"
elif [ "$ENV" = "production" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
  config_file="fly.toml"
else
  printf "\e[31mWrong ENV\n\e[0m"
  exit 1
fi

printf "\e[36mDeploying bot on %s...\n\e[0m" "$ENV"
dir=$(cd "$(dirname "$0")" && pwd)
git_sha=$(git rev-parse --short HEAD)
id="$app:latest"
docker buildx build --no-cache --platform=linux/amd64 -t registry.fly.io/"$id" "$dir"/../../../
return_code=$?
if [ $return_code -eq 0 ]; then
  printf "\e[32m]\nDone building the image\n\e[0m"
  docker push registry.fly.io/"$id"
  return_code=$?
  if [ $return_code -eq 0 ]; then
    printf "\e[32m]\nPushed the image to the fly registry\n\e[0m"
    flyctl deploy --local-only --now --update-only --image-label=latest --label="git_sha=$git_sha" --config="$dir"/../.fly/"$config_file"
    return_code=$?
    if [ $return_code -eq 0 ]; then
      printf "\e[32m]\nDeployed bot on %s. Waiting 30 seconds before restarting the machine\n\e[0m" "$ENV"
      duration=30
      while [ "$duration" -gt 0 ]
      do
        printf "\e[35m\r%02d:%02d\e[0m" $((duration/60)) $((duration%60))
        sleep 1
        duration=$((duration-1))
      done
      flyctl machine restart "$machine_id" --config="$dir"/../.fly/"$config_file"
      printf "\e[32m]\nRestarted machine on %s\n\e[0m" "$ENV"
    fi
  fi
fi
