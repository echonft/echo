import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { pipe } from 'ramda'
import type { Chain } from 'viem'

export function getChain(): Chain {
  return pipe(getChainId, getChainById)()
}
