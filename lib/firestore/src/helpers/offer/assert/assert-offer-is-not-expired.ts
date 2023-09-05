import { dateIsPast } from '../../converters/from-firestore/date-is-past'
import { assertOffer } from './assert-offer'
import { Offer } from '@echo/firestore-types'
import { propIsNil } from '@echo/utils'
import { pipe, prop } from 'ramda'

export function assertOfferIsNotExpired(
  offer: Partial<Offer> | undefined
): asserts offer is NonNullable<Partial<Offer>> {
  assertOffer(offer)
  if (propIsNil('expired', offer)) {
    // try with the date
    if (propIsNil('expiresAt', offer)) {
      throw Error('listing is missing expiration date')
    }
    if (pipe(prop('expiresAt'), dateIsPast)(offer)) {
      throw Error('listing is expired')
    }
  }
  if (offer.expired) {
    throw Error('offer is expired')
  }
}
