import { getAlchemyApiKey } from './get-alchemy-api-key'

export const getBaseUrl = (): string => `https://eth-mainnet.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
