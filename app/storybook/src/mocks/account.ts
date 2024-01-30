import type { HexString } from '@echo/utils/types/hex-string'
import type { AccountResult } from '@echo/web3/types/account-result'
import { toLower } from 'ramda'

export function account(state: 'connected' | 'connecting' | 'disconnected') {
  return function (): AccountResult {
    switch (state) {
      case 'connected':
        return {
          address: toLower<HexString>('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e'),
          isConnected: true,
          isConnecting: false,
          isDisconnected: false,
          isReconnecting: false
        }
      case 'connecting':
        return {
          address: undefined,
          isConnected: false,
          isConnecting: true,
          isDisconnected: false,
          isReconnecting: false
        }
      case 'disconnected':
        return {
          address: undefined,
          isConnected: false,
          isConnecting: false,
          isDisconnected: true,
          isReconnecting: false
        }
    }
  }
}
