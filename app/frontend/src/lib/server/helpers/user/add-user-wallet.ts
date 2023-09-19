import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { WalletData } from '@echo/firestore/types/model/wallet-data'
import { ServerError } from '@server/helpers/error/server-error'

export const addUserWallet = async (userId: string, wallet: WalletData) => {
  try {
    await addWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error adding wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
