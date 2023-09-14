// TODO support more chains

import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'

export function getAlchemyBaseUrl() {
  return `https://eth-mainnet.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
}
