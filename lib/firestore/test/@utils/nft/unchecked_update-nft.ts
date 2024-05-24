import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { isNil } from 'ramda'

export async function unchecked_updateNft(index: NftIndex, data: Partial<Nft>): Promise<Nft> {
  const snapshot = await getNftSnapshot(index)
  if (isNil(snapshot)) {
    throw Error(`NFT with index ${JSON.stringify(index)} does not exist`)
  }
  return updateReference<Nft>({
    collectionReference: getNftsCollectionReference(),
    id: snapshot.id,
    data
  })
}
