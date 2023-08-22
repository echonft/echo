import { ApiError } from '../api-error'
import { setNftOwner, User, Wallet } from '@echo/firestore'

export const updateNftOwner = async (nftId: string, user: User, wallet: Wallet) => {
  try {
    await setNftOwner(nftId, user.id, wallet)
  } catch (e) {
    throw new ApiError(500, 'Error updating NFT')
  }
}
