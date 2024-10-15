import { isIn } from '@echo/utils/fp/is-in'
import type { ChainName } from '@echo/utils/types/chain-name'

export function isEvmChain(chain: ChainName) {
  return isIn(['blast_sepolia', 'sepolia', 'ethereum', 'blast', 'sei'], chain)
}
