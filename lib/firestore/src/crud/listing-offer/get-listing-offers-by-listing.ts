import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { isNil } from 'ramda'

export async function getListingOffersByListing(slug: string): Promise<ListingOfferDocumentData[]> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`listing with slug ${slug} does not exist`))
  }
  return getListingOffersByListingId(snapshot.id)
}
