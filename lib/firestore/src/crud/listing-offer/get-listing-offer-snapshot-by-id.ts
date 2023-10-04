import { getListingOffersCollection } from '@echo/firestore/helpers/collection/get-listing-offers-collection'
import { getQuerySnapshotDocumentSnapshot } from '@echo/firestore/helpers/crud/get-query-snapshot-document-snapshot'

export async function getListingOfferSnapshotById(id: string) {
  const querySnapshot = await getListingOffersCollection().where('id', '==', id).get()
  return getQuerySnapshotDocumentSnapshot(querySnapshot)
}
