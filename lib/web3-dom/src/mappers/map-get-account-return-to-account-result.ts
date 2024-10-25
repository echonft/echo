import { getChainById } from '@echo/model/helpers/chain/get-chain-by-id'
import { isSupportedChain } from '@echo/model/helpers/chain/is-supported-chain'
import type { Wallet } from '@echo/model/types/wallet'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { AccountResult } from '@echo/web3-dom/types/account-result'
import type { AccountStatus } from '@echo/web3-dom/types/account-status'
import {
  always,
  anyPass,
  applySpec,
  assoc,
  complement,
  dissoc,
  equals,
  ifElse,
  isNil,
  modify,
  pick,
  pipe,
  prop,
  propEq,
  toLower,
  tryCatch,
  when
} from 'ramda'
import type { GetAccountReturnType } from 'wagmi/actions'

function getWallet(args: ReturnType<typeof setStatus>): Nullable<Wallet> {
  return ifElse(
    anyPass([
      propEq<AccountResult['status'], 'status'>('disconnected', 'status'),
      propIsNil('address'),
      pipe<[ReturnType<typeof setStatus>], Nullable<number>, boolean>(
        prop('chainId'),
        ifElse(isNil, always(true), pipe(tryCatch(getChainById, always(undefined)), complement(isSupportedChain)))
      )
    ]),
    always(undefined),
    applySpec<Wallet>({
      address: pipe(prop('address'), toLower<HexString>),
      chain: pipe(prop('chainId'), getChainById)
    })
  )(args)
}

function setWallet(args: ReturnType<typeof setStatus>): AccountResult {
  const wallet = getWallet(args)
  return pipe(assoc('wallet', wallet), dissoc('address'), dissoc('chainId'))(args)
}

function setStatus(
  args: Pick<GetAccountReturnType, 'address' | 'chainId' | 'status'>
): Pick<GetAccountReturnType, 'address' | 'chainId'> & Pick<AccountResult, 'status'> {
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
    ReturnType<typeof setStatus>,
    AccountResult
  >(
    pick(['address', 'chainId', 'status']),
    setStatus,
    setWallet
  )(result)
}
