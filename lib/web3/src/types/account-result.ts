import type { HexString } from '@echo/utils/types/hex-string'

export interface AccountResult {
  address: Lowercase<HexString> | undefined
  isConnected: boolean
  isConnecting: boolean
  isDisconnected: boolean
  isReconnecting: boolean
}
