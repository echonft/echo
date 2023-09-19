import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { ServerError } from '@server/helpers/error/server-error'

export async function getWalletsByUserId(userId: string) {
  try {
    return await getWalletsForUser(userId)
  } catch (e) {
    throw new ServerError(`error getting wallets for user with id ${userId}`, e)
  }
}
