import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import { type Wallet } from '@echo/model/types/wallet'

export async function addUserWallet(userId: string, wallet: Wallet) {
  try {
    await addWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error adding wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
