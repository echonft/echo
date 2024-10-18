import { isIn } from '@echo/utils/fp/is-in'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import type { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function isSupportedChain(chain: Nullable<Chain>): boolean {
  if (isNil(chain)) {
    return false
  }
  return isIn(getSupportedChains(), chain)
}
