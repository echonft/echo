import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import type { WalletData } from '@echo/firestore/types/model/wallet-data'
import { ServerError } from '@server/helpers/error/server-error'

export const removeUserWallet = async (userId: string, wallet: WalletData) => {
  try {
    await removeWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error removing wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
