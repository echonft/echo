import { getListingOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listing-offers-collection-reference'
import { getQuerySnapshotDocumentsData } from '@echo/firestore/helpers/crud/get-query-snapshot-documents-data'
import { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'

export async function getListingOffersByListingId(listingId: string): Promise<ListingOffer[]> {
  const querySnapshot = await getListingOffersCollectionReference().where('listingId', '==', listingId).get()
  return getQuerySnapshotDocumentsData(querySnapshot)
}
