import { ServerError } from '../error/server-error'
import { setNftOwner } from '@echo/firestore'
import { Wallet } from '@echo/firestore-types'

export const updateNftOwner = async (nftId: string, userId: string, wallet: Wallet) => {
  try {
    await setNftOwner(nftId, userId, wallet)
  } catch (e) {
    throw new ServerError(
      `error updating nft with id ${nftId} with user with id ${userId} and wallet ${JSON.stringify(wallet)}`,
      e
    )
  }
}
