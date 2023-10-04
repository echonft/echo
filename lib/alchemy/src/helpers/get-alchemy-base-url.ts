// TODO support more chains

import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'
import { isDev } from '@echo/utils/constants/is-dev'

export function getAlchemyBaseUrl() {
  return `https://eth-${isDev ? 'sepolia' : 'mainnet'}.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
}
