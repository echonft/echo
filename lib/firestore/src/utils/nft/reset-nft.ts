import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { getNftMockById } from '@echo/model/mocks/nft/get-nft-mock-by-id'
import { type NftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function resetNft(nft: NftIndex): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: getNftsCollectionReference(),
      id: snapshot.id,
      data: getNftMockById(snapshot.id)
    })
  }
}
