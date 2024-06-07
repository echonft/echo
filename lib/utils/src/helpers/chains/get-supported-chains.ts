import { isTestnet } from '@echo/utils/constants/is-testnet'
import type { ChainName } from '@echo/utils/types/chain-name'
import { type NonEmptyArray } from 'ramda'

// export const SUPPORTED_CHAINS = isTestnet ? TESTNET_CHAIN_NAMES : MAINNET_CHAIN_NAMES
// Blast only for now
export function getSupportedChains() {
  if (isTestnet) {
    return ['blast_sepolia'] as NonEmptyArray<ChainName>
  }
  return ['blast'] as NonEmptyArray<ChainName>
}
