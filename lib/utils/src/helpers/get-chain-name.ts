import { CHAIN } from '@echo/utils/constants/chains/chains'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getChainName(chainId: Nullable<number>): Nullable<ChainName> {
  if (isNil(chainId)) {
    return undefined
  }
  return CHAIN[chainId]
}
