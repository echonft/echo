import { ApiError } from '../api-error'
import { updateUserWallets as firestoreUpdateUserWallets, Wallet } from '@echo/firestore'

export const updateUserWallets = (userId: string, wallets: Wallet[]) => {
  try {
    return firestoreUpdateUserWallets(userId, wallets)
  } catch (e) {
    throw new ApiError(500, 'Error updating user wallets')
  }
}
