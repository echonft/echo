import { ServerError } from '../error/server-error'
import { removeUserWallet as firestoreRemoveUserWallet, Wallet } from '@echo/firestore'

export const removeUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreRemoveUserWallet(userId, wallet)
  } catch (e) {
    throw new ServerError('Error removing wallet')
  }
}
