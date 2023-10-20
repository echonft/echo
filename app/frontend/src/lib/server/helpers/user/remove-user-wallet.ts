import { removeWallet } from '@echo/firestore/crud/wallet/remove-wallet'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { type Wallet } from '@echo/model/types/wallet'

export async function removeUserWallet(userId: string, wallet: Wallet) {
  try {
    await removeWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error removing wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
