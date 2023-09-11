import { addUserWallet as firestoreAddUserWallet } from '@echo/firestore'
import type { Wallet } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export const addUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreAddUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error adding wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
