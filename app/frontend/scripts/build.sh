#!/bin/bash

# Fail on any error
set -e

# Download and install the Google Cloud SDK
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-479.0.0-linux-x86_64.tar.gz
tar -xf google-cloud-sdk-479.0.0-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh -q

# Initialize the SDK
source ./google-cloud-sdk/path.bash.inc

# Update the gcloud CLI
gcloud --quiet components update

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

# Get the secrets
AUTH_DISCORD_ID=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_ID" --project=${project_id})
if [ ! "${AUTH_DISCORD_ID}" ]; then
  >&2 echo "DISCORD_CLIENT_ID secret not found"
  exit 1
fi
AUTH_DISCORD_SECRET=$(gcloud secrets versions access 'latest' --secret="DISCORD_CLIENT_SECRET" --project=${project_id})
if [ ! "${AUTH_DISCORD_SECRET}" ]; then
  >&2 echo "DISCORD_CLIENT_SECRET secret not found"
  exit 1
fi
AUTH_SECRET=$(gcloud secrets versions access 'latest' --secret="AUTH_SECRET" --project=${project_id})
if [ ! "${AUTH_SECRET}" ]; then
  >&2 echo "AUTH_SECRET secret not found"
  exit 1
fi
SENTRY_AUTH_TOKEN=$(gcloud secrets versions access 'latest' --secret="SENTRY_AUTH_TOKEN" --project=${project_id})
if [ ! "${SENTRY_AUTH_TOKEN}" ]; then
  >&2 echo "SENTRY_AUTH_TOKEN secret not found"
  exit 1
fi

# build with the env vars
AUTH_SECRET="${AUTH_SECRET}" \
AUTH_DISCORD_ID="${AUTH_DISCORD_ID}" \
AUTH_DISCORD_SECRET="${AUTH_DISCORD_SECRET}" \
SECRET_MANAGER_EMAIL="${SECRET_MANAGER_EMAIL}" \
SECRET_MANAGER_PRIVATE_KEY="${SECRET_MANAGER_PRIVATE_KEY}" \
SENTRY_AUTH_TOKEN="${SENTRY_AUTH_TOKEN}" \
 pnpm exec turbo build --filter=@echo/frontend
