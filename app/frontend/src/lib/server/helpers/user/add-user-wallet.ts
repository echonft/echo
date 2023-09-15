import { addWallet as firestoreAddUserWallet } from '@echo/firestore/crud/wallet/add-wallet'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { ServerError } from '@server/helpers/error/server-error'

export const addUserWallet = async (userId: string, wallet: FirestoreWallet) => {
  try {
    await firestoreAddUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error adding wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
