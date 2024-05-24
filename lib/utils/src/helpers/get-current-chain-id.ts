import { SEPOLIA_CHAIN_ID } from '@echo/utils/constants/chain-ids'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getCurrentChainId(): number {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  if (isNilOrEmpty(chainId)) {
    return SEPOLIA_CHAIN_ID
  }
  return parseInt(chainId, 10)
}
