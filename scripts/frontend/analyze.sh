#!/bin/sh

dir=$(cd "$(dirname "$0")" && pwd)
ENV="development" ANALYZE="true" "$dir"/../../app/frontend/scripts/build.sh
