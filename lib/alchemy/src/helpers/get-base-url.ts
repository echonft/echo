import { getAlchemyApiKey } from './get-alchemy-api-key'

// TODO support more chains
export function getBaseUrl() {
  return `https://eth-mainnet.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
}
