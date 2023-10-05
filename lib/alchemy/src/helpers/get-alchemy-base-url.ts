import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'
import { isDev } from '@echo/utils/constants/is-dev'

// TODO support more chains
export function getAlchemyBaseUrl() {
  return `https://eth-${isDev ? 'sepolia' : 'mainnet'}.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
}
