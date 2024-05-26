import type { Wallet } from '@echo/model/types/wallet'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { getChainName } from '@echo/utils/helpers/get-chain-name'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import type { AccountStatus } from '@echo/web3-dom/types/account-status'
import {
  always,
  applySpec,
  assoc,
  dissoc,
  either,
  equals,
  ifElse,
  isNil,
  modify,
  pick,
  pipe,
  prop,
  toLower,
  when
} from 'ramda'
import type { GetAccountReturnType } from 'wagmi/actions'

function getWallet<T extends Pick<GetAccountReturnType, 'address' | 'chainId'>>(args: T): Nullable<Wallet> {
  return ifElse(
    either(
      propIsNil('address'),
      pipe<[Pick<GetAccountReturnType, 'address' | 'chainId'>], Nullable<number>, Nullable<ChainName>, boolean>(
        prop('chainId'),
        getChainName,
        isNil
      )
    ),
    always(undefined),
    applySpec<Wallet>({
      address: pipe(prop('address'), toLower<HexString>),
      chain: pipe(prop('chainId'), getChainName)
    })
  )(args)
}

function setWallet(
  args: Pick<GetAccountReturnType, 'address' | 'chainId' | 'status'>
): Pick<GetAccountReturnType, 'status'> & Pick<AccountResult, 'wallet'> {
  const wallet = getWallet(args)
  return pipe(assoc('wallet', wallet), dissoc('address'), dissoc('chainId'))(args)
}

function setStatus(args: ReturnType<typeof setWallet>): AccountResult {
  return modify<'status', GetAccountReturnType['status'], AccountStatus>(
    'status',
    when(equals('reconnecting'), always<AccountStatus>('connecting')) as (
      status: GetAccountReturnType['status']
    ) => AccountStatus
  )(args)
}

export function mapGetAccountReturnToAccountResult(result: GetAccountReturnType): AccountResult {
  return pipe<
    [GetAccountReturnType],
    Pick<GetAccountReturnType, 'address' | 'chainId' | 'status'>,
    ReturnType<typeof setWallet>,
    AccountResult
  >(
    pick(['address', 'chainId', 'status']),
    setWallet,
    setStatus
  )(result)
}
