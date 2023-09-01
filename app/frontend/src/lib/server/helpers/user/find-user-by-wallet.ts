import { ServerError } from '../error/server-error'
import { findUserByWallet as firestoreFindUserByWallet, Wallet } from '@echo/firestore'

export const findUserByWallet = async (wallet: Wallet) => {
  try {
    return await firestoreFindUserByWallet(wallet)
  } catch (e) {
    throw new ServerError('Error fetching user')
  }
}
