import { getChainName } from '@echo/alchemy/helpers/get-chain-name'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getAlchemyTransportUrl(chainId: number) {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
  if (isNilOrEmpty(apiKey)) {
    return undefined
  }
  return `wss://${getChainName(chainId)}.g.alchemy.com/v2/${apiKey}`
}
