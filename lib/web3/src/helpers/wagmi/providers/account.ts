import { unlessPropIsNil } from '@echo/utils/fp/unless-prop-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { AccountResult } from '@echo/web3/types/account-result'
import { getAccount, type GetAccountResult } from '@wagmi/core'
import { modify, pipe, toLower } from 'ramda'

export function account(): AccountResult {
  return pipe(
    getAccount,
    unlessPropIsNil<'address', GetAccountResult, AccountResult>('address', modify('address', toLower<HexString>))
  )()
}
