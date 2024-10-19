import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import type { Slug } from '@echo/model/types/slug'
import { isNil } from 'ramda'

export async function getListingOffersByListing(slug: Slug): Promise<ListingOfferDocumentData[]> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(ListingError.NotFound))
  }
  return getListingOffersByListingId(snapshot.id)
}
