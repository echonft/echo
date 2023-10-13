import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'

export async function getAllListingOffers() {
  const querySnapshot = await getListingOffersCollectionReference().get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
