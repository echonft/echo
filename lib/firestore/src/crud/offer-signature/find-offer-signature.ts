import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/get-query-snapshot-document-data'

export async function findOfferSignature(offerId: string, userId: string) {
  const querySnapshot = await getOfferSignaturesCollectionReference()
    .where('offerId', '==', offerId)
    .where('userId', '==', userId)
    .get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
