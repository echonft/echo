import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'

export function getChainId(): number {
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  if (isNilOrEmpty(chainId)) {
    throw Error('.env should contain NEXT_PUBLIC_CHAIN_ID')
  }
  return parseInt(chainId)
}
