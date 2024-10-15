import { getAllListingOfferMocks } from '@echo/firestore/mocks/listing-offer/get-all-listing-offer-mocks'
import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer-document-data'
import { filter, propEq } from 'ramda'

export function getListingOfferMocksByOfferId(offerId: string): ListingOfferDocumentData[] {
  return filter(propEq(offerId, 'offerId'), getAllListingOfferMocks())
}
