import type { AccountResult } from '@echo/web3/types/account-result'
import { assoc, pick, pipe, propEq, when } from 'ramda'
import type { GetAccountReturnType } from 'wagmi/actions'

type PartialGetAccountReturnType = Pick<GetAccountReturnType, 'address' | 'chain' | 'chainId' | 'status'>
export function mapGetAccountReturnToAccountResult(result: GetAccountReturnType): AccountResult {
  return pipe<[GetAccountReturnType], PartialGetAccountReturnType, AccountResult>(
    pick(['address', 'chain', 'chainId', 'status']),
    when<PartialGetAccountReturnType, AccountResult>(
      propEq<GetAccountReturnType['status'], 'status'>('reconnecting', 'status'),
      assoc('status', 'connecting')
    ) as (args: PartialGetAccountReturnType) => AccountResult
  )(result)
}
