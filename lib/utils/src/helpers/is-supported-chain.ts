import { SUPPORTED_CHAINS } from '@echo/utils/constants/chains/supported-chains'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function isSupportedChain(chain: Nullable<ChainName>): boolean {
  if (isNil(chain)) {
    return false
  }
  return isIn(SUPPORTED_CHAINS, chain)
}
