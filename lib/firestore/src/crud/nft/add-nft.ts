import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Nft } from '@echo/model/types/nft'

export async function addNft(nft: Nft): Promise<NewDocument<Nft>> {
  const id = await setReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    data: nft
  })
  return { id, data: nft }
}
