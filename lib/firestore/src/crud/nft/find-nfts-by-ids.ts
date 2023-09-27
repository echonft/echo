import { CollectionName } from '@echo/firestore/constants/collection-name'
import { nftDataConverter } from '@echo/firestore/converters/nft/nft-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findNftsByIds(ids: string[]) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.NFTS)
    .where('id', 'in', ids)
    .withConverter(nftDataConverter)
    .get()

  return getQuerySnapshotDocumentsData(querySnapshot)
}
