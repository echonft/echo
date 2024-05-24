import { getChainName } from '@echo/utils/helpers/get-chain-name'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import { always, assoc, converge, identity, pick, pipe, prop, propEq, when } from 'ramda'
import type { GetAccountReturnType } from 'wagmi/actions'

export function mapGetAccountReturnToAccountResult(result: GetAccountReturnType): AccountResult {
  return pipe<
    [GetAccountReturnType],
    Pick<GetAccountReturnType, 'address' | 'chainId' | 'status'>,
    Omit<AccountResult, 'status'> & Pick<GetAccountReturnType, 'status'>,
    AccountResult
  >(
    pick(['address', 'chainId', 'status']),
    converge(assoc, [always('chain'), pipe(prop('chainId'), getChainName), identity]),
    when(propEq('reconnecting', 'status'), assoc('status', 'connecting')) as unknown as (
      obj: Omit<AccountResult, 'status'> & Pick<GetAccountReturnType, 'status'>
    ) => AccountResult
  )(result)
}
