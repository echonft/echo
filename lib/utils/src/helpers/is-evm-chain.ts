import { EVM_CHAIN_NAMES } from '@echo/utils/constants/chain-names'
import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'

export function isEvmChain(chain: ChainName) {
  return isIn(EVM_CHAIN_NAMES, chain)
}
