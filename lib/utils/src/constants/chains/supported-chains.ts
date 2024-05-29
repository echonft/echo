import { isTestnet } from '@echo/utils/constants/is-testnet'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

// export const SUPPORTED_CHAINS = isTestnet ? TESTNET_CHAIN_NAMES : MAINNET_CHAIN_NAMES
// Blast only for now
export const SUPPORTED_CHAINS = isTestnet
  ? (['blast_sepolia'] as NonEmptyArray<ChainName>)
  : (['blast'] as NonEmptyArray<ChainName>)
