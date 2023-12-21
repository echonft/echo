import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { includes, pipe, prop } from 'ramda'

export function userHasWallet(user: AuthUser, wallet: Wallet): boolean {
  return pipe<[AuthUser], Wallet[], boolean>(prop('wallets'), includes(wallet))(user)
}
