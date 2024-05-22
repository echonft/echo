import type { ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { dissoc, equals } from 'ramda'

export function listingOffersEq(listingOfferA: ListingOffer, listingOfferB: ListingOffer) {
  return equals(dissoc('fulfillingStatus', listingOfferA), dissoc('fulfillingStatus', listingOfferB))
}
