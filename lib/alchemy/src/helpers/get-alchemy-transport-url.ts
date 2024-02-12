import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'
import { getChainName } from '@echo/alchemy/helpers/get-chain-name'

export function getAlchemyTransportUrl(chainId: number) {
  return `wss://${getChainName(chainId)}.g.alchemy.com/v2/${getAlchemyApiKey()}`
}
