import { getSwapsCollection } from '@echo/firestore/helpers/collection/get-swaps-collection'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findSwapByOfferId(offerId: string) {
  const querySnapshot = await getSwapsCollection().where('offerId', '==', offerId).get()
  return getQuerySnapshotDocumentData(querySnapshot)
}
