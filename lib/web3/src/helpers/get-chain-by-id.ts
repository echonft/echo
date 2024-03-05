import { MAINNET_CHAIN_ID, SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import type { Chain } from 'viem'
import { mainnet, sepolia } from 'viem/chains'

export function getChainById(chainId: number): Chain {
  switch (chainId) {
    case MAINNET_CHAIN_ID:
      return mainnet
    case SEPOLIA_CHAIN_ID:
      return sepolia
    default:
      throw Error(`chain id ${chainId} is not supported`)
  }
}
