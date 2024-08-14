import { getNftSnapshot } from '@echo/firestore/crud/nft/get-nft-snapshot'
import { getNftsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-nfts-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { NftDocumentData } from '@echo/firestore/types/model/nft/nft-document-data'
import { type NftIndex } from '@echo/model/types/nft'
import type { UpdateData } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export async function updateNft(nft: NftIndex, data: UpdateData<NftDocumentData>): Promise<void> {
  const snapshot = await getNftSnapshot(nft)
  if (!isNil(snapshot)) {
    await updateReference({
      collectionReference: getNftsCollectionReference(false),
      id: snapshot.id,
      data
    })
  }
}
