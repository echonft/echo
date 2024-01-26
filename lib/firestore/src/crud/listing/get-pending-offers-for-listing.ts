import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { READ_ONLY_OFFER_STATES } from '@echo/model/constants/offer-states'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import { isIn } from '@echo/utils/fp/is-in'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, isNil, map, pipe, prop, reject } from 'ramda'

export function getPendingOffersForListing(listing: Listing): Promise<Offer[]> {
  return pipe(
    prop('id'),
    getListingOffersByListingId,
    andThen(
      pipe(
        map(pipe(prop('offerId'), findOfferById)),
        promiseAll,
        andThen(
          pipe<[(Offer | undefined)[]], Offer[], Offer[]>(
            reject(isNil),
            reject(pipe(prop('state'), isIn(READ_ONLY_OFFER_STATES)))
          )
        )
      )
    )
  )(listing)
}
