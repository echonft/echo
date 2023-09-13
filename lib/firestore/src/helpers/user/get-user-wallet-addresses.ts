import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { filter, isNil, map, pipe, prop, propEq } from 'ramda'

function internalFn(chainId: number): (user: Partial<FirestoreUser>) => string[] {
  return pipe(
    prop<FirestoreWallet[]>('wallets'),
    filter(propEq(chainId, 'chainId')),
    map<FirestoreWallet, string>(prop<string>('address'))
  )
}

export function getUserWalletAddresses(chainId: number, user: Partial<FirestoreUser>): string[]
export function getUserWalletAddresses(chainId: number): (user: Partial<FirestoreUser>) => string[]
export function getUserWalletAddresses(
  chainId: number,
  user?: Partial<FirestoreUser>
): string[] | ((user: Partial<FirestoreUser>) => string[]) {
  if (isNil(user)) {
    return internalFn(chainId)
  }
  return internalFn(chainId)(user)
}
