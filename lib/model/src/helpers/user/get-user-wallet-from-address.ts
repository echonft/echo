import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { equals, find, pipe, prop, toLower } from 'ramda'

export function getUserWalletFromAddress(user: AuthUser, address: string): Wallet | undefined {
  return pipe<[AuthUser], Wallet[], Wallet | undefined>(
    prop('wallets'),
    find(pipe(prop('address'), equals(toLower(address))))
  )(user)
}
