import { nftsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { Nft } from '@echo/model/types/nft'

export async function addNft(nft: Nft): Promise<string> {
  return setReference({
    collectionReference: nftsCollection(),
    data: nft
  })
}
