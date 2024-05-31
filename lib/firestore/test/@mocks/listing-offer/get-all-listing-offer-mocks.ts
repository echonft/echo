import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { listingOfferMock } from '@echo/firestore-mocks/listing-offer/listing-offer-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllListingOfferMocks() {
  return Object.values(listingOfferMock()) as NonEmptyArray<ListingOffer>
}
