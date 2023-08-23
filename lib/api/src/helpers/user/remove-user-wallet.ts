import { ApiError } from '../error/api-error'
import { removeUserWallet as firestoreRemoveUserWallet, Wallet } from '@echo/firestore'

export const removeUserWallet = async (userId: string, wallet: Wallet) => {
  try {
    await firestoreRemoveUserWallet(userId, wallet)
  } catch (e) {
    throw new ApiError(500, 'Error removing wallet')
  }
}
