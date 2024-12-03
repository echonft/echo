#!/bin/sh

if [ "$VERCEL_PROJECT" = "dev" ] || [ "$VERCEL_PROJECT" = "echo" ]; then
  printf "\e[36mDeleting all old production deployments on %s...\n\e[0m" "$VERCEL_PROJECT"
  vercel link -y -p "$VERCEL_PROJECT" 1>/dev/null 2>&1
  EXIT_STATUS=0
  while [ $EXIT_STATUS -eq 0 ]
  do
    DEPLOYMENT_LIST=$(vercel ls "$VERCEL_PROJECT" --environment=production 2>/dev/null)
    DEPLOYMENTS=$(echo "$DEPLOYMENT_LIST" | tr '\n' ' ' | sed 's/ $//')
    if [ ! "$DEPLOYMENTS" ]; then
      echo "Deleted all old production deployments on $VERCEL_PROJECT"
      exit 0
    fi
    echo "$DEPLOYMENTS" | xargs -n 1 -I {} sh -c 'vercel rm -y -s "{}" 2>/dev/null'
    EXIT_STATUS=$?
  done
  printf "\e[32m\nDone deleting all old production deployments on %s\n\e[0m" "$VERCEL_PROJECT"
  exit 0
else
  printf "\e[31mCanceled\n\e[0m"
  exit 1
fi
