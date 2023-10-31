import { mainnet, sepolia } from 'viem/chains'
import type { Chain } from 'viem/types/chain'

export function getChainById(chainId: number): Chain {
  switch (chainId) {
    case 1:
      return mainnet as Chain
    case 11155111:
      return sepolia as Chain
    default:
      throw Error(`chain id ${chainId} is not supported`)
  }
}
