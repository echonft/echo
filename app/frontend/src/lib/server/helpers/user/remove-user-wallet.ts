import { removeUserWallet as firestoreRemoveUserWallet } from '@echo/firestore'
import type { Wallet } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export const removeUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreRemoveUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error removing wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
