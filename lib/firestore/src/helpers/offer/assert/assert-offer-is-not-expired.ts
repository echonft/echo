import { dateIsPast } from '@echo/firestore/helpers/converters/from-firestore/date-is-past'
import { assertOffer } from '@echo/firestore/helpers/offer/assert/assert-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { pipe, prop } from 'ramda'

export function assertOfferIsNotExpired(
  offer: Partial<FirestoreOffer> | undefined
): asserts offer is NonNullable<Partial<FirestoreOffer>> {
  assertOffer(offer)
  if (propIsNil('expired', offer)) {
    // try with the date
    if (propIsNil('expiresAt', offer)) {
      throw Error('offer is missing expiration date')
    }
    if (pipe(prop('expiresAt'), dateIsPast)(offer)) {
      throw Error('offer is expired')
    }
  }
  if (offer.expired) {
    throw Error('offer is expired')
  }
}
