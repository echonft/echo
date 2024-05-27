import { EVM_CHAINS } from '@echo/utils/constants/chains/evm-chains'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'

export function isEvmChain(chain: ChainName) {
  return isIn(EVM_CHAINS, chain)
}
