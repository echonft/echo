import { ServerError } from '../error/server-error'
import { setNftOwner, Wallet } from '@echo/firestore'

export const updateNftOwner = async (nftId: string, userId: string, wallet: Wallet) => {
  try {
    await setNftOwner(nftId, userId, wallet)
  } catch (e) {
    throw new ServerError('Error updating NFT')
  }
}
