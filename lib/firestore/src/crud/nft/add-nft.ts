import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { assoc } from 'ramda'

export async function addNft(nft: Omit<Nft, 'updatedAt'>): Promise<NewDocument<Nft>> {
  const data = assoc('updatedAt', now(), nft)
  const id = await setReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    data
  })
  return { id, data }
}
