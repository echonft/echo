import type { ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer/listing-offer-document-data'
import { dissoc, equals } from 'ramda'

export function eqListingOffers(listingOfferA: ListingOfferDocumentData, listingOfferB: ListingOfferDocumentData) {
  return equals(dissoc('fulfillingStatus', listingOfferA), dissoc('fulfillingStatus', listingOfferB))
}
