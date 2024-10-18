import { Chain } from '@echo/utils/constants/chain'
import type { Nullable } from '@echo/utils/types/nullable'
import { equals, isNil } from 'ramda'

export function isTestnetChain(chain: Nullable<Chain>): boolean {
  if (isNil(chain)) {
    return false
  }
  return equals(chain, Chain.BlastSepolia) || equals(chain, Chain.Sepolia)
}
