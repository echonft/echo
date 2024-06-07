#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "$1" == "dev" ]; then
  app="echo-bot-dev"
  machine_id="e784e469a63678"
elif [ "$1" == "prod" ]; then
  app="echobot"
  machine_id="784e9d4c271418"
else
  exit 1
fi

git_sha=$(git rev-parse --short HEAD)
id="${app}:${git_sha}"
docker buildx build --platform=linux/amd64 --target=bot -t registry.fly.io/${id} ${dir}/../../../
docker push registry.fly.io/${id}
flyctl deploy -i registry.fly.io/${id} --local-only --app=${app} --only-machines=${machine_id} --image-label=${git_sha}
