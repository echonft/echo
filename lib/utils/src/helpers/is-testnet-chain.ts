import { TESTNET_CHAIN_NAMES } from '@echo/utils/constants/chain-names'
import { isIn } from '@echo/utils/fp/is-in'
import { getChainName } from '@echo/utils/helpers/get-chain-name'
import type { ChainName } from '@echo/utils/types/chain-name'
import { is, isNil, pipe, when } from 'ramda'

export function isTestnetChain(chain: ChainName | number | undefined): boolean {
  if (isNil(chain)) {
    return false
  }
  return pipe(when(is(Number), getChainName), isIn(TESTNET_CHAIN_NAMES))(chain)
}
