import { CollectionName } from '@echo/firestore/constants/collection-name'
import { swapDataConverter } from '@echo/firestore/converters/swap/swap-data-converter'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { firestoreApp } from '@echo/firestore/services/firestore-app'

export async function getAllSwaps() {
  const querySnapshot = await firestoreApp().collection(CollectionName.SWAPS).withConverter(swapDataConverter).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
