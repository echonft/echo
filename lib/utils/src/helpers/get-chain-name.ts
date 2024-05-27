import {
  BLAST_CHAIN_ID,
  BLAST_SEPOLIA_CHAIN_ID,
  MAINNET_CHAIN_ID,
  SEPOLIA_CHAIN_ID
} from '@echo/utils/constants/chain-ids'
import {
  CHAIN_BLAST,
  CHAIN_ETHEREUM,
  TESTNET_CHAIN_BLAST,
  TESTNET_CHAIN_SEPOLIA
} from '@echo/utils/constants/chain-names'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'

export function getChainName(chainId: Nullable<number>): ChainName | undefined {
  switch (chainId) {
    case BLAST_CHAIN_ID:
      return CHAIN_BLAST
    case BLAST_SEPOLIA_CHAIN_ID:
      return TESTNET_CHAIN_BLAST
    case MAINNET_CHAIN_ID:
      return CHAIN_ETHEREUM
    case SEPOLIA_CHAIN_ID:
      return TESTNET_CHAIN_SEPOLIA
    default:
      return undefined
  }
}
