import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { dissoc, equals } from 'ramda'

export function eqListingOffers(listingOfferA: ListingOffer, listingOfferB: ListingOffer) {
  return equals(dissoc('fulfillingStatus', listingOfferA), dissoc('fulfillingStatus', listingOfferB))
}
