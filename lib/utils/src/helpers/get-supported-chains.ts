import { SUPPORTED_CHAINS } from '@echo/utils/constants/chain-names'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getSupportedChains(): NonEmptyArray<ChainName> {
  return SUPPORTED_CHAINS as NonEmptyArray<ChainName>
}
