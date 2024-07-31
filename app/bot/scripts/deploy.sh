#!/bin/sh

if [ "${ENV}" = "development" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "${ENV}" = "production" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
elif [ "${ENV}" = "staging" ]; then
  app="echo-bot-staging"
  machine_id="e82d92ef0243e8"
else
  printf "\e[31mWrong ENV\n\e[0m"
  exit 1
fi

printf "\e[36mDeploying bot on %s...\n\e[0m" "${ENV}"
# shellcheck disable=SC2128
# shellcheck disable=SC3028
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
git_sha=$(git rev-parse --short HEAD)
id="${app}:${git_sha}"
docker buildx build --no-cache --platform=linux/amd64 -t registry.fly.io/"${id}" "${dir}"/../../../
docker push registry.fly.io/"${id}"
flyctl deploy -i registry.fly.io/"${id}" --local-only --app=${app} --only-machines=${machine_id} --image-label="${git_sha}"
sleep 30
flyctl machine restart ${machine_id} --app=${app}
printf "\e[32m]\nDone deploying bot on %s\n\e[0m" "${ENV}"
