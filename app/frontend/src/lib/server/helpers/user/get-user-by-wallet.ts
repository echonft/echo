import { findUserByWallet } from '@echo/firestore/crud/user/find-user-by-wallet'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { ServerError } from '@server/helpers/error/server-error'

export const getUserByWallet = async (wallet: FirestoreWallet) => {
  try {
    return await findUserByWallet(wallet)
  } catch (e) {
    throw new ServerError(`error getting user with wallet ${JSON.stringify(wallet)}`, e)
  }
}
