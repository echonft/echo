import type { HexString } from '@echo/utils/types/hex-string'
import { getAccount } from '@wagmi/core'

export interface AccountResult {
  address: HexString | undefined
  isConnected: boolean
  isConnecting: boolean
  isDisconnected: boolean
  isReconnecting: boolean
}
export type AccountProvider = () => AccountResult
export function account(): AccountResult {
  return getAccount()
}
