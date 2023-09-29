import type { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { filter, isNil, map, pipe, prop, propEq } from 'ramda'

function internalFn(chainId: number): (user: FirestoreDiscordUser) => string[] {
  return pipe(
    prop<FirestoreWallet[]>('wallets'),
    filter(propEq(chainId, 'chainId')),
    map<FirestoreWallet, string>(prop<string>('address'))
  )
}

export function getUserWalletAddresses(chainId: number, user: FirestoreDiscordUser): string[]
export function getUserWalletAddresses(chainId: number): (user: FirestoreDiscordUser) => string[]
export function getUserWalletAddresses(
  chainId: number,
  user?: FirestoreDiscordUser
): string[] | ((user: FirestoreDiscordUser) => string[]) {
  if (isNil(user)) {
    return internalFn(chainId)
  }
  return internalFn(chainId)(user)
}
