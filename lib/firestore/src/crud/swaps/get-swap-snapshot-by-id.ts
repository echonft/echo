import { CollectionName } from '@echo/firestore/constants/collection-name'
import { swapDataConverter } from '@echo/firestore/converters/swap/swap-data-converter'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getSwapSnapshotById(id: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SWAPS)
    .withConverter(swapDataConverter)
    .where('id', '==', id)
    .get()

  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
