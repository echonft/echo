import { removeUserWallet as firestoreRemoveUserWallet } from '@echo/firestore/crud/user/remove-user-wallet'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { ServerError } from '@server/helpers/error/server-error'

export const removeUserWallet = async (userId: string, wallet: FirestoreWallet) => {
  try {
    await firestoreRemoveUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error removing wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
