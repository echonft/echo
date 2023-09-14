import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { updateUserWallets } from '@echo/firestore/crud/user/update-user-wallets'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { includes, isNil } from 'ramda'

export async function addUserWallet(id: string, wallet: FirestoreWallet) {
  const user = await findUserById(id)
  if (isNil(user)) {
    throw Error('invalid user id')
  }
  const { wallets } = user
  if (!includes(wallet, wallets)) {
    await updateUserWallets(id, [wallet, ...wallets])
  }
}
