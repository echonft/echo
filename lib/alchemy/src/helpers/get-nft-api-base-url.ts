import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'
import { getChainName } from '@echo/alchemy/helpers/get-chain-name'

export function getNftApiBaseUrl(chainId: number) {
  return `https://${getChainName(chainId)}.g.alchemy.com/nft/v3/${getAlchemyApiKey()}/`
}
