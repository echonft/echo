import type { HexString } from '@echo/utils/types/hex-string'
import { getAddress } from 'viem'

export function formatAddress(address: HexString): HexString {
  return getAddress(address)
}
