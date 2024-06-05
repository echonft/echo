#!/bin/sh
dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
if [ "$1" == "dev" ]; then
  app="echo-contract-listener-dev"
  machine_id="d8d9365aed97d8"
elif [ "$1" == "prod" ]; then
  app="echo-contract-listener"
  machine_id="d891697f46e008"
else
  exit 1
fi

git_sha=$(git rev-parse --short HEAD)
id="${app}:${git_sha}"
docker buildx build --platform=linux/amd64 --target=bot -t registry.fly.io/${id} ${dir}/../../../
docker push registry.fly.io/${id}
flyctl deploy -i registry.fly.io/${id} --local-only --app=${app} --only-machines=${machine_id} --image-label=${git_sha} --label="version=${git_sha}"
