import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { mapUserToUserDetails } from '@echo/firestore/mappers/map-user-to-user-details'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { isNil } from 'ramda'

export async function setNftOwner(nftId: string, userId: string, wallet: FirestoreWallet) {
  const user = await findUserById(userId)
  if (isNil(user)) {
    throw Error('invalid user id')
  }
  const userDetails = mapUserToUserDetails(user, wallet)
  return updateNft(nftId, { owner: userDetails })
}
