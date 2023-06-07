import { getAlchemyApiKey } from './get-alchemy-api-key'

// TODO Should be chain dependent, we assume only eth for now
export const getBaseUrl = (): string => `https://eth-mainnet.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
