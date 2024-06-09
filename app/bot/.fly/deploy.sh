#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "${ENV}" == "development" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "${ENV}" == "production" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
else
  exit 1
fi

git_sha=$(git rev-parse --short HEAD)
id="${app}:${git_sha}"
docker buildx build --no-cache --platform=linux/amd64 --target=bot -t registry.fly.io/${id} ${dir}/../../../
docker push registry.fly.io/${id}
flyctl deploy -i registry.fly.io/${id} --local-only --app=${app} --only-machines=${machine_id} --image-label=${git_sha}
sleep 240
flyctl machine restart ${machine_id} --app=${app}
