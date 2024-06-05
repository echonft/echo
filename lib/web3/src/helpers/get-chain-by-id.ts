import { getChain } from '@echo/utils/helpers/get-chain'
import { CHAINS } from '@echo/web3/constants/chains'
import type { Chain } from 'viem'

export function getChainById(chainId: number): Chain {
  const chainName = getChain(chainId)
  return CHAINS[chainName]
}
