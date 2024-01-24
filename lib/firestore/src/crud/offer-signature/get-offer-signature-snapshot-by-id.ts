import { getOfferSignaturesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-signatures-collection-reference'
import { getQuerySnapshotUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot-unique-document-snapshot'

export async function getOfferSignatureSnapshotById(id: string) {
  const querySnapshot = await getOfferSignaturesCollectionReference().where('id', '==', id).get()
  return getQuerySnapshotUniqueDocumentSnapshot(querySnapshot)
}
