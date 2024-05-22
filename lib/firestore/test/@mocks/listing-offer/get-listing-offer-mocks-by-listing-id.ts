import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { getAllListingOfferMocks } from '@echo/firestore-mocks/listing-offer/get-all-listing-offer-mocks'
import { filter, propEq } from 'ramda'

export function getListingOfferMocksByListingId(listingId: string): ListingOffer[] {
  return filter(propEq(listingId, 'listingId'), getAllListingOfferMocks())
}
