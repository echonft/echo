import { ServerError } from '../error/server-error'
import { addUserWallet as firestoreAddUserWallet, Wallet } from '@echo/firestore'

export const addUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreAddUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError('Error adding wallet')
  }
}
