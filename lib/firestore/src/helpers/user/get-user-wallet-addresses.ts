import { User, Wallet } from '@echo/firestore-types'
import { filter, isNil, map, pipe, prop, propEq } from 'ramda'

function internalFn(chainId: number): (user: Partial<User>) => string[] {
  return pipe(
    prop<Wallet[]>('wallets'),
    filter(propEq(chainId, 'chainId')),
    map<Wallet, string>(prop<string>('address'))
  )
}

export function getUserWalletAddresses(chainId: number, user: Partial<User>): string[]
export function getUserWalletAddresses(chainId: number): (user: Partial<User>) => string[]
export function getUserWalletAddresses(
  chainId: number,
  user?: Partial<User>
): string[] | ((user: Partial<User>) => string[]) {
  if (isNil(user)) {
    return internalFn(chainId)
  }
  return internalFn(chainId)(user)
}
