#!/bin/sh

convert_to_camel_case() {
  local kebab_case_filename="$1"
  local filename_without_extension="${kebab_case_filename%.ts}"
  camel_case=$(echo "$filename_without_extension" | perl -pe 's/-(.)/\U\1/g' | perl -pe 's/^([A-Z])/\l\1/')
  echo "$camel_case"
}

if [ "${ENV}" == "development" ]; then
  project="echo-dev-fallback"
elif [ "${ENV}" == "production" ]; then
  project="echo-prod-b71e2"
else
  >&2 echo "ENV not set"
  exit 1
fi

dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
functions_dir="${dir}/../src/functions"
for function_filename in "${functions_dir}"/*; do
  if [ -f "${function_filename}" ]; then
    function_basename=$(basename "${function_filename}")
    function_name=$(convert_to_camel_case "${function_basename}")
    if [ "${NEXT_PUBLIC_IS_TESTNET}" == "1" ]; then
      gcloud functions deploy "${function_name}" --project=${project} --set-env-vars NEXT_PUBLIC_IS_TESTNET="${NEXT_PUBLIC_IS_TESTNET}" --region=us-central1
    else
      gcloud functions deploy "${function_name}" --project=${project} --region=us-central1
    fi
  fi
done


