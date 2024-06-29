import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft, type NftIndex } from '@echo/model/types/nft'
import { now } from '@echo/utils/helpers/now'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { assoc, isNil } from 'ramda'

export async function updateNft(data: DeepPartial<Nft> & Required<NftIndex>): Promise<Nft> {
  const snapshot = await getNftSnapshot(data)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`NFT #${data.tokenId} for collection ${data.collection.slug} does not exist`))
  }
  return updateReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data: assoc('updatedAt', now(), data)
  })
}
