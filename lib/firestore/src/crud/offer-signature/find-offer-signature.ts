import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { getQuerySnapshotDocumentData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-document-data'

export async function findOfferSignature(offerId: string) {
  const querySnapshot = await getOfferSignaturesCollectionReference().where('offerId', '==', offerId).get()

  return getQuerySnapshotDocumentData(querySnapshot)
}
