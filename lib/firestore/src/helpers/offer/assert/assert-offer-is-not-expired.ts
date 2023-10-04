import { dateNumberIsPast } from '@echo/firestore/helpers/converters/from-firestore/date-number-is-past'
import { assertOffer } from '@echo/firestore/helpers/offer/assert/assert-offer'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { pipe, prop } from 'ramda'

export function assertOfferIsNotExpired(
  offer: FirestoreOffer | undefined
): asserts offer is NonNullable<FirestoreOffer> {
  assertOffer(offer)
  if (propIsNil('expired', offer)) {
    // try with the date
    if (propIsNil('expiresAt', offer)) {
      throw Error('offer is missing expiration date')
    }
    if (pipe(prop('expiresAt'), dateNumberIsPast)(offer)) {
      throw Error('offer is expired')
    }
  }
  if (offer.expired) {
    throw Error('offer is expired')
  }
}
