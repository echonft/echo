import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import { getUser } from '@echo/firestore/helpers/user/get-user'
import { type UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { type Wallet } from '@echo/model/types/wallet'

export async function setNftOwner(nftId: string, user: UserDocumentData, wallet: Wallet) {
  const userDetails = getUser(user, wallet)
  return updateNft(nftId, { owner: userDetails })
}
