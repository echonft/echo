import { unlessPropIsNil } from '@echo/utils/fp/unless-prop-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import { getAccount, type GetAccountResult } from '@wagmi/core'
import { modify, pipe, toLower } from 'ramda'

export interface AccountResult {
  address: Lowercase<HexString> | undefined
  isConnected: boolean
  isConnecting: boolean
  isDisconnected: boolean
  isReconnecting: boolean
}
export type AccountProvider = () => AccountResult
export function account(): AccountResult {
  return pipe(
    getAccount,
    unlessPropIsNil<'address', GetAccountResult, AccountResult>('address', modify('address', toLower<HexString>))
  )()
}
