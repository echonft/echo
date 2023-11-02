import { getAlchemyApiKey } from '@echo/alchemy/helpers/get-alchemy-api-key'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { isEmpty } from 'ramda'
import { http } from 'viem'
import type { Chain } from 'viem/types/chain'

export function getViemAlchemyHttp(chain: Chain) {
  if (isNilOrEmpty(chain.rpcUrls.alchemy) || isEmpty(chain.rpcUrls.alchemy?.http)) {
    throw Error('chain must support Alchemy RPC URL')
  }
  return http(`${chain.rpcUrls.alchemy.http[0]}/${getAlchemyApiKey()}`)
}
