import { listingOfferMock } from '@echo/firestore/mocks/listing-offer/listing-offer-mock'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { type NonEmptyArray } from 'ramda'

export function getAllListingOfferMocks() {
  return Object.values(listingOfferMock()) as NonEmptyArray<ListingOfferDocumentData>
}
