import {
  BLAST_CHAIN_ID,
  BLAST_SEPOLIA_CHAIN_ID,
  MAINNET_CHAIN_ID,
  SEPOLIA_CHAIN_ID
} from '@echo/utils/constants/chain-ids'
import type { Chain } from 'viem'
import { blast, blastSepolia, mainnet, sepolia } from 'viem/chains'

export function getChainById(chainId: number): Chain {
  switch (chainId) {
    case MAINNET_CHAIN_ID:
      return mainnet
    case SEPOLIA_CHAIN_ID:
      return sepolia
    case BLAST_CHAIN_ID:
      return blast
    case BLAST_SEPOLIA_CHAIN_ID:
      return blastSepolia
    default:
      throw Error(`chain id ${chainId} is not supported`)
  }
}
