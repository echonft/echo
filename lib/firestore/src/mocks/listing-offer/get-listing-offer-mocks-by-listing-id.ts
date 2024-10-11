import { getAllListingOfferMocks } from '@echo/firestore/mocks/listing-offer/get-all-listing-offer-mocks'
import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer/listing-offer-document-data'
import { filter, propEq } from 'ramda'

export function getListingOfferMocksByListingId(listingId: string): ListingOfferDocumentData[] {
  return filter(propEq(listingId, 'listingId'), getAllListingOfferMocks())
}
