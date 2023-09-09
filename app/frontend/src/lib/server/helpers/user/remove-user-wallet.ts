import { ServerError } from '../error/server-error'
import { removeUserWallet as firestoreRemoveUserWallet } from '@echo/firestore'
import { Wallet } from '@echo/firestore-types'

export const removeUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreRemoveUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error removing wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
