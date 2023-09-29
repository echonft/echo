import { CollectionName } from '@echo/firestore/constants/collection-name'
import { swapDataConverter } from '@echo/firestore/converters/swap/swap-data-converter'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function findSwapByOfferId(offerId: string) {
  const querySnapshot = await firestoreApp()
    .collection(CollectionName.SWAPS)
    .withConverter(swapDataConverter)
    .where('offerId', '==', offerId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
