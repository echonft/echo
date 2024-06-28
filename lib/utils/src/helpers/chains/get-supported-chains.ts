import { isTestnet } from '@echo/utils/constants/is-testnet'
import type { ChainName } from '@echo/utils/types/chain-name'
import { type NonEmptyArray } from 'ramda'

export function getSupportedChains() {
  if (isTestnet) {
    return ['blast_sepolia', 'sepolia'] as NonEmptyArray<ChainName>
  }
  return ['blast'] as NonEmptyArray<ChainName>
}
