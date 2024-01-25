import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'

export function setNftOwner(nftId: string, owner: User): Promise<Nft> {
  return updateNft(nftId, { owner })
}
