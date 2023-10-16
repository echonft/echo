import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import type { Wallet } from '@echo/model/types/wallet'
import { ServerError } from '@server/helpers/error/server-error'

export async function addUserWallet(userId: string, wallet: Wallet) {
  try {
    await addWallet(userId, wallet)
  } catch (e) {
    throw new ServerError(`error adding wallet ${JSON.stringify(wallet)} for user with id ${userId}`, e)
  }
}
