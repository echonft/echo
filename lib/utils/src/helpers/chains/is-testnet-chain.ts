import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { equals, isNil } from 'ramda'

export function isTestnetChain(chain: Nullable<ChainName>): boolean {
  if (isNil(chain)) {
    return false
  }
  return equals(chain, 'blast_sepolia')
}
