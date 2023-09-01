import { ServerError } from '../error/server-error'
import { setNftOwner, User, Wallet } from '@echo/firestore'

export const updateNftOwner = async (nftId: string, user: User, wallet: Wallet) => {
  try {
    await setNftOwner(nftId, user.id, wallet)
  } catch (e) {
    throw new ServerError('Error updating NFT')
  }
}
