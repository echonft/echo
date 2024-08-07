import { getChain } from '@echo/utils/helpers/chains/get-chain'
import { getViemChainByName } from '@echo/web3/helpers/get-viem-chain-by-name'
import type { Chain } from 'viem'

export function getViemChainById(chainId: number): Chain {
  const chainName = getChain(chainId)
  return getViemChainByName(chainName)
}
