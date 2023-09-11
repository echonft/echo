import { findUserByWallet } from '@echo/firestore'
import type { Wallet } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export const getUserByWallet = async (wallet: Wallet) => {
  try {
    return await findUserByWallet(wallet)
  } catch (e) {
    throw new ServerError(`error getting user with wallet ${JSON.stringify(wallet)}`, e)
  }
}
