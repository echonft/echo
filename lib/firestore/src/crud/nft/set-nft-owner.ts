import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getUserDetails } from '@echo/firestore/helpers/user/get-user-details'
import { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'

export async function setNftOwner(nftId: string, user: FirestoreUser, wallet: WalletData) {
  const userDetails = getUserDetails(user, wallet)
  return updateNft(nftId, { owner: userDetails })
}
