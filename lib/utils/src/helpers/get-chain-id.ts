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

export function getChainId(chain: ChainName) {
  switch (chain) {
    case CHAIN_BLAST:
      return BLAST_CHAIN_ID
    case TESTNET_CHAIN_BLAST:
      return BLAST_SEPOLIA_CHAIN_ID
    case CHAIN_ETHEREUM:
      return MAINNET_CHAIN_ID
    case TESTNET_CHAIN_SEPOLIA:
      return SEPOLIA_CHAIN_ID
  }
}
