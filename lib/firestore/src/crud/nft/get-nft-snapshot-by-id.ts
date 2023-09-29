import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getNftSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('id', '==', id)
    .withConverter(nftDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
