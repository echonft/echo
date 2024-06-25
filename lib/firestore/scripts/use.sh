if [ "${ENV}" != "development" ] && [ "${ENV}" != "staging" ] && [ "${ENV}" != "production" ]; then
  >&2 echo "ENV not set"
  exit 1
else
  firebase use "${ENV}"
fi
