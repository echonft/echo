import type { ChainName } from '@echo/utils/types/chain-name'
import type { NonEmptyArray } from 'ramda'

export function getChains(): NonEmptyArray<ChainName> {
  return ['blast_sepolia', 'sepolia', 'blast', 'ethereum'] as const
}
