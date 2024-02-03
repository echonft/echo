import { unlessPropIsNil } from '@echo/utils/fp/unless-prop-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { AccountResult } from '@echo/web3/types/account-result'
import { assoc, modify, pick, pipe, propEq, toLower, when } from 'ramda'
import type { GetAccountReturnType } from 'wagmi/actions'

type PartialGetAccountReturnType = Pick<GetAccountReturnType, 'address' | 'chain' | 'chainId' | 'status'>
type PartialAccountResult = AccountResult & Record<'address', HexString | undefined>
export function mapGetAccountReturnToAccountResult(result: GetAccountReturnType): AccountResult {
  return pipe<[GetAccountReturnType], PartialGetAccountReturnType, PartialAccountResult, AccountResult>(
    pick(['address', 'chain', 'chainId', 'status']),
    when<PartialGetAccountReturnType, PartialAccountResult>(
      propEq<GetAccountReturnType['status'], 'status'>('reconnecting', 'status'),
      assoc('status', 'connecting')
    ) as (args: PartialGetAccountReturnType) => PartialAccountResult,
    unlessPropIsNil('address', modify('address', toLower<HexString>))
  )(result)
}
