import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { assoc } from 'ramda'

export function addNft(nft: Omit<Nft, 'id' | 'updatedAt'>): Promise<Nft> {
  const data = assoc('updatedAt', now(), nft)
  await setReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    data
  })
  return data
}
