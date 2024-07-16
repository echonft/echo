#!/bin/sh

if [ "${VERCEL_PROJECT}" = "dev" ] || [ "${VERCEL_PROJECT}" = "staging" ] || [ "${VERCEL_PROJECT}" = "echo" ] || [ "${VERCEL_PROJECT}" = "storybook" ]; then
  vercel link -y -p "$VERCEL_PROJECT" 1>/dev/null 2>&1
  EXIT_STATUS=0
  while [ $EXIT_STATUS -eq 0 ]
  do
    DEPLOYMENT_LIST=$(vercel ls "$VERCEL_PROJECT" --environment=preview 2>/dev/null)
    DEPLOYMENTS=$(echo "$DEPLOYMENT_LIST" | tr '\n' ' ' | sed 's/ $//')
    if [ ! "$DEPLOYMENTS" ]; then
      echo "Deleted all canceled deployments on $VERCEL_PROJECT"
      exit 0
    fi
    echo "$DEPLOYMENTS" | xargs -n 1 -I {} sh -c 'vercel rm -y "{}" 2>/dev/null'
    EXIT_STATUS=$?
  done
  echo "Deleted all canceled deployments on $VERCEL_PROJECT"
  exit 0
else
  >&2 echo "VERCEL_PROJECT not set"
  exit 1
fi
