import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Nft } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import { pipe } from 'ramda'

export function addNft(nft: Omit<Nft, 'id' | 'updatedAt'>): Promise<Nft> {
  return pipe(
    getNftsCollectionReference,
    setReference({
      ...nft,
      updatedAt: now()
    })
  )()
}
