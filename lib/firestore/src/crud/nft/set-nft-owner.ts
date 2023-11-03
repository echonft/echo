import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { User } from '@echo/model/types/user'

export async function setNftOwner(nftId: string, owner: User) {
  return updateNft(nftId, { owner })
}
