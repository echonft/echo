import { ApiError } from '../error/api-error'
import { findUserByWallet as firestoreFindUserByWallet, Wallet } from '@echo/firestore'

export const findUserByWallet = async (wallet: Wallet) => {
  try {
    return await firestoreFindUserByWallet(wallet)
  } catch (e) {
    throw new ApiError(500, 'Error fetching user')
  }
}
