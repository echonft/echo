#!/bin/sh

# shellcheck disable=SC3028
# shellcheck disable=SC2128
dir=$(cd "$(dirname "$BASH_SOURCE")" && pwd)
if ! sh "${dir}"/../base/check-newt.sh; then
  exit 1
fi

ENV=$(whiptail --default-item=development --notags --menu "Pick an environment" 10 30 3 \
"development" "Development" \
"staging" "Staging" \
"production" "Production (be careful!)" 3>&1 1>&2 2>&3)

# shellcheck disable=SC3044
pushd "${dir}"/../../app/frontend/ || exit 1
ENV=${ENV} CI="1" scripts/build.sh
AUTH_TRUST_HOST=true ENV=${ENV} scripts/start.sh
# shellcheck disable=SC3044
popd || exit 1
