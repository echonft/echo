import type { ChainName } from '@echo/opensea/types/chain-name'
import {
  BLAST_CHAIN_ID,
  BLAST_SEPOLIA_CHAIN_ID,
  MAINNET_CHAIN_ID,
  SEPOLIA_CHAIN_ID
} from '@echo/utils/constants/chain-ids'

export function getChainName(chainId: number): ChainName {
  switch (chainId) {
    case BLAST_CHAIN_ID:
      return 'blast'
    case BLAST_SEPOLIA_CHAIN_ID:
      return 'blast_sepolia'
    case MAINNET_CHAIN_ID:
      return 'ethereum'
    case SEPOLIA_CHAIN_ID:
      return 'sepolia'
    default:
      throw Error(`chain id ${chainId} is not supported by Alchemy`)
  }
}
