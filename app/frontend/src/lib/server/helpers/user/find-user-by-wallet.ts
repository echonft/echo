import { ServerError } from '../error/server-error'
import { findUserByWallet as firestoreFindUserByWallet } from '@echo/firestore'
import { Wallet } from '@echo/firestore-types'

export const findUserByWallet = async (wallet: Wallet) => {
  try {
    return await firestoreFindUserByWallet(wallet)
  } catch (e) {
    throw new ServerError('Error fetching user')
  }
}
