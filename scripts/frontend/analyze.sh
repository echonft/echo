#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
ENV="development" ANALYZE="true" "${dir}"/../../app/frontend/scripts/build.sh

