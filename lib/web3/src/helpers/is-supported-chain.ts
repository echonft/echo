import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'
import { SUPPORTED_CHAINS } from '@echo/web3/constants/supported-chains'

export function isSupportedChain(chain: ChainName): boolean {
  return isIn(SUPPORTED_CHAINS)(chain)
}
