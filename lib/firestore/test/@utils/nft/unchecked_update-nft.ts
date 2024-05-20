import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft } from '@echo/model/types/nft'

export async function unchecked_updateNft(id: string, data: Partial<Omit<Nft, 'id'>>): Promise<Nft> {
  return updateReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    id,
    data
  })
}
