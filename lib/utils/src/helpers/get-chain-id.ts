import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getChainId(): number {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  if (isNilOrEmpty(chainId)) {
    return 11155111
  }
  return parseInt(chainId, 10)
}
