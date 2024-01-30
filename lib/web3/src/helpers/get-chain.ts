import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { partialRight, pipe } from 'ramda'
import type { Chain } from 'viem'
import { sepolia } from 'viem/chains'

export function getChain(): Chain {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  if (isNilOrEmpty(chainId)) {
    return sepolia
  }
  return pipe(partialRight(parseInt, [10]), getChainById)(chainId)
}
