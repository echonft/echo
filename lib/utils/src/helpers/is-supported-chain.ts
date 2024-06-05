import { isIn } from '@echo/utils/fp/is-in'
import { getSupportedChains } from '@echo/utils/helpers/get-supported-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function isSupportedChain(chain: Nullable<ChainName>): boolean {
  if (isNil(chain)) {
    return false
  }
  return isIn(getSupportedChains(), chain)
}
