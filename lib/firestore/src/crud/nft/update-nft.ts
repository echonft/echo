import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import { type Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { now } from '@echo/utils/helpers/now'
import { assoc, isNil, pipe } from 'ramda'

export async function updateNft(data: Partial<Omit<Nft, 'updatedAt'>> & NftIndex): Promise<Nft> {
  const snapshot = await pipe(getNftIndex, getNftSnapshot)(data)
  if (isNil(snapshot)) {
    throw Error(`NFT #${data.tokenId} for collection ${data.collection.slug} does not exist`)
  }
  return updateReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data: assoc('updatedAt', now(), data)
  })
}
