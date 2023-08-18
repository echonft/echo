import { mapUserToUserDetails } from '../../mappers/map-user-to-user-details'
import { Wallet } from '../../types/model/wallet'
import { findUserById } from '../user/find-user-by-id'
import { updateNft } from './update-nft'

export const setNftOwner = async (nftId: string, userId: string, wallet: Wallet) => {
  const user = await findUserById(userId)
  const userDetails = mapUserToUserDetails(user, wallet)
  return updateNft(nftId, { owner: userDetails })
}
