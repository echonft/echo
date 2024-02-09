import { getAlchemyPublicApiKey } from '@echo/alchemy/helpers/get-alchemy-public-api-key'
import { getChainName } from '@echo/alchemy/helpers/get-chain-name'

export function getAlchemyPublicTransportUrl(chainId: number) {
  return `wss://${getChainName(chainId)}.g.alchemy.com/v2/${getAlchemyPublicApiKey()}`
}
