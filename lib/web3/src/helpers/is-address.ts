import type { HexString } from '@echo/model/types/hex-string'
import { isAddress as viemIsAddress, type IsAddressOptions } from 'viem'

export function isAddress(address: string, options?: IsAddressOptions): address is HexString {
  return viemIsAddress(address, options)
}
