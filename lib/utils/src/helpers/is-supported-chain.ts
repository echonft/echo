import { SUPPORTED_CHAINS } from '@echo/utils/constants/supported-chains'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'

export function isSupportedChain(chain: ChainName): boolean {
  return isIn(SUPPORTED_CHAINS)(chain)
}
