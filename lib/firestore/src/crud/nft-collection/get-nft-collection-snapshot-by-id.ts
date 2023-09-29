import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftCollectionDataConverter } from '@echo/firestore/converters/nft-collection/nft-collection-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getNftCollectionSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFT_COLLECTIONS)
    .where('id', '==', id)
    .withConverter(nftCollectionDataConverter)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
