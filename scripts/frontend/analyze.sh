dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
ENV="development" NEXT_PUBLIC_IS_TESTNET="1" ANALYZE="true" "${dir}"/../../app/frontend/scripts/build.sh

