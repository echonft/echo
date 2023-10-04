import { getListingOffersCollection } from '@echo/firestore/helpers/collection/get-listing-offers-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllListingOffers() {
  const querySnapshot = await getListingOffersCollection().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
