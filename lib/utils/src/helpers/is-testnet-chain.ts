import { TESTNET_CHAINS } from '@echo/utils/constants/chains/testnet-chains'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function isTestnetChain(chain: Nullable<ChainName>): boolean {
  if (isNil(chain)) {
    return false
  }
  return isIn(TESTNET_CHAINS, chain)
}
