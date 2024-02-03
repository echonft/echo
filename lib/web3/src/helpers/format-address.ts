import type { HexString } from '@echo/utils/types/hex-string'
import { getAddress } from 'viem'

export function formatAddress(args: { address: string; chainId?: number }): HexString {
  return getAddress(args.address, args.chainId)
}
