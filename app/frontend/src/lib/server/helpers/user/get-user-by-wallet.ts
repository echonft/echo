import { ServerError } from '../error/server-error'
import { findUserByWallet } from '@echo/firestore'
import { Wallet } from '@echo/firestore-types'

export const getUserByWallet = async (wallet: Wallet) => {
  try {
    return await findUserByWallet(wallet)
  } catch (e) {
    throw new ServerError(`error getting user with wallet ${JSON.stringify(wallet)}`, e)
  }
}
