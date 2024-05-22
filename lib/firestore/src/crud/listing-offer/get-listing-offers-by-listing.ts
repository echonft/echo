import { getListingSnapshot } from '@echo/firestore/crud/listing/get-listing'
import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { isNil } from 'ramda'

export async function getListingOffersByListing(slug: string): Promise<ListingOffer[]> {
  const snapshot = await getListingSnapshot(slug)
  if (isNil(snapshot)) {
    throw Error(`listing with slug ${slug} does not exist`)
  }
  return getListingOffersByListingId(snapshot.id)
}
