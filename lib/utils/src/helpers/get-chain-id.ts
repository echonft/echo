import {
  BLAST_CHAIN_ID,
  BLAST_SEPOLIA_CHAIN_ID,
  MAINNET_CHAIN_ID,
  SEPOLIA_CHAIN_ID
} from '@echo/utils/constants/chain-ids'
import type { ChainName } from '@echo/utils/types/chain-name'

export function getChainId(chain: ChainName): number {
  switch (chain) {
    case 'blast':
      return BLAST_CHAIN_ID
    case 'blast_sepolia':
      return BLAST_SEPOLIA_CHAIN_ID
    case 'ethereum':
      return MAINNET_CHAIN_ID
    case 'sepolia':
      return SEPOLIA_CHAIN_ID
  }
}
