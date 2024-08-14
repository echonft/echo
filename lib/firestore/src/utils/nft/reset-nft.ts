import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { getNftDocumentDataMock } from '@echo/firestore/mocks/nft/get-nft-document-data-mock'
import { type NftIndex } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export async function resetNft(nft: NftIndex): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: getNftsCollectionReference(false),
      id: snapshot.id,
      data: getNftDocumentDataMock(snapshot.data())
    })
  }
}
