import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isEmpty } from 'ramda'
import { type Chain, webSocket } from 'viem'

export function getViemAlchemyHttp(chain: Chain) {
  if (isNilOrEmpty(chain.rpcUrls.alchemy) || isEmpty(chain.rpcUrls.alchemy?.http)) {
    throw Error('chain must support Alchemy RPC URL')
  }
  return webSocket(`${chain.rpcUrls.alchemy.http[0]}/${getAlchemyApiKey()}`)
}
