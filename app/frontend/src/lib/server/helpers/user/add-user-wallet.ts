import { ServerError } from '../error/server-error'
import { addUserWallet as firestoreAddUserWallet } from '@echo/firestore'
import { Wallet } from '@echo/firestore-types'

export const addUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreAddUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error adding wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
