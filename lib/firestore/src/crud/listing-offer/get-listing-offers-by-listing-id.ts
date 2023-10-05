import { getListingOffersCollection } from '@echo/firestore/helpers/collection/get-listing-offers-collection'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { FirestoreListingOffer } from '@echo/firestore/types/model/listing-offer/firestore-listing-offer'

export async function getListingOffersByListingId(listingId: string): Promise<FirestoreListingOffer[]> {
  const querySnapshot = await getListingOffersCollection().where('listingId', '==', listingId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
