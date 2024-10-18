import { getListingOffersByListingId } from '@echo/firestore/crud/listing-offer/get-listing-offers-by-listing-id'
import { getOfferById } from '@echo/firestore/crud/offer/get-offer-by-id'
import { readOnlyOfferStates } from '@echo/model/constants/offer-state'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Offer } from '@echo/model/types/offer/offer'
import { isIn } from '@echo/utils/fp/is-in'
import { promiseAll } from '@echo/utils/fp/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, isNil, map, pipe, prop, reject } from 'ramda'

// might be used depending on design
// noinspection JSUnusedGlobalSymbols
export function getPendingOffersForListing(listing: Listing): Promise<Offer[]> {
  return pipe(
    prop('slug'),
    getListingOffersByListingId,
    andThen(
      pipe(
        map(pipe(prop('offerId'), getOfferById)),
        promiseAll,
        andThen(
          pipe<[Nullable<Offer>[]], Offer[], Offer[]>(
            reject(isNil),
            reject(pipe(prop('state'), isIn(readOnlyOfferStates)))
          )
        )
      )
    )
  )(listing)
}
