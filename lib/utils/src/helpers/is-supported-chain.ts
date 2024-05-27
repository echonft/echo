import { isIn } from '@echo/utils/fp/is-in'
import { getChainName } from '@echo/utils/helpers/get-chain-name'
import { getSupportedChains } from '@echo/utils/helpers/get-supported-chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import { is, isNil, pipe, when } from 'ramda'

export function isSupportedChain(chain: ChainName | number | undefined): boolean {
  if (isNil(chain)) {
    return false
  }
  return pipe(when(is(Number), getChainName), isIn(getSupportedChains()))(chain)
}
