import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { auth } from '@echo/frontend/lib/auth/auth'
import { mapFirestoreWalletToWallet } from '@echo/frontend/lib/mappers/map-firestore-wallet-to-wallet'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { andThen, assoc, isNil, map, pipe, prop } from 'ramda'

export async function getAuthUser() {
  const session = await auth()
  if (isNil(session) || isNil(session.user)) {
    return undefined
  }
  const { user } = session
  if (isNil(user.wallets)) {
    const wallets = await pipe<[AuthUser], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
      prop('username'),
      getWalletsForUser,
      andThen(map(mapFirestoreWalletToWallet))
    )(user)
    return assoc('wallets', wallets, user)
  }
  return user
}
