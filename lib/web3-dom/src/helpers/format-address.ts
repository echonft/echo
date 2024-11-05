import type { HexString } from '@echo/model/types/hex-string'
import { getAddress } from 'viem'

export function formatAddress(address: string): HexString {
  return getAddress(address)
}
