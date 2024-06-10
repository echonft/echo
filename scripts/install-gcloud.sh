#!/bin/bash

# Fail on any error
set -e

# Install curl if not present
if ! command -v curl &> /dev/null
then
  apt-get update && apt-get install -y curl
fi

# Install dependencies for Python and SQLite
apt-get update && apt-get install -y python3 python3-pip python3-venv python3-dev libsqlite3-dev

# Install Python SQLite bindings
pip3 install --upgrade pip
pip3 install pysqlite3

# Install the gcloud CLI
curl -sSL https://sdk.cloud.google.com | bash

# Initialize the gcloud CLI
source $HOME/.bashrc
gcloud --quiet components update
gcloud --quiet components install beta
gcloud --quiet components install kubectl

# Authenticate with a service account (replace with your actual authentication method)
if [ "${ENV}" == "development" ]; then
  project_id="echo-dev-fallback"
elif [ "${ENV}" == "staging" ]; then
  project_id="echo-staging-ba121"
elif [ "${ENV}" == "production" ]; then
  project_id="echo-prod-b71e2"
else
  >&2 echo "ENV not set"
  exit 1
fi

decoded_key=$(echo "${SECRET_MANAGER_PRIVATE_KEY}" | base64 --decode)
private_key=$(echo -e "${decoded_key}" | awk '{printf "%s\\n", $0}')
# Create a temporary JSON key file
temp_key_file=$(mktemp)
cat <<EOF > "${temp_key_file}"
{
  "type": "service_account",
  "project_id": "${project_id}",
  "private_key_id": "some-key-id",
  "private_key": "${private_key}",
  "client_email": "${SECRET_MANAGER_EMAIL}",
  "client_id": "some-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/${SECRET_MANAGER_EMAIL}",
  "universe_domain": "googleapis.com"
}
EOF
# Authenticate with gcloud using the temporary key file
gcloud auth activate-service-account "${SECRET_MANAGER_EMAIL}" \
        --key-file="${temp_key_file}" --project="${project_id}"
rm -rf "${temp_key_file}"
gcloud config set project "${project_id}"
