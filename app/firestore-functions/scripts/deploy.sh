#!/bin/sh

convert_to_camel_case() {
  local kebab_case_filename="$1"
  local filename_without_extension="${kebab_case_filename%.ts}"
  camel_case=$(echo "$filename_without_extension" | perl -pe 's/-(.)/\U\1/g' | perl -pe 's/^([A-Z])/\l\1/')
  echo "$camel_case"
}

if [ "${ENV}" == "development" ]; then
  project="echo-dev-fallback"
  NEXT_PUBLIC_IS_TESTNET="1"
elif [ "${ENV}" == "staging" ]; then
  project="echo-staging-ba121"
  NEXT_PUBLIC_IS_TESTNET="0"
elif [ "${ENV}" == "production" ]; then
  project="echo-prod-b71e2"
  NEXT_PUBLIC_IS_TESTNET="0"
else
  >&2 echo "ENV not set"
  exit 1
fi

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
functions_dir="${dir}/../src/functions"
if [ "${NEXT_PUBLIC_IS_TESTNET}" == "1" ]; then
  set_env_vars="--set-env-vars=NEXT_PUBLIC_IS_TESTNET=1"
else
  set_env_vars=""
fi

for function_filename in "${functions_dir}"/*; do
  if [ -f "${function_filename}" ]; then
    function_basename=$(basename "${function_filename}")
    function_name=$(convert_to_camel_case "${function_basename}")
    gcloud functions deploy "${function_name}" --runtime=nodejs20 --gen2 --project=${project} --region=us-central1 --set-secrets=SECRET_MANAGER_EMAIL=SECRET_MANAGER_EMAIL:latest,SECRET_MANAGER_PRIVATE_KEY=SECRET_MANAGER_PRIVATE_KEY:latest ${set_env_vars}
  fi
done


