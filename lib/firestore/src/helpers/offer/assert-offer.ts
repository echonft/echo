import { Offer } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw Error('invalid offer id')
  }
  if (offer.expired) {
    throw Error('offer is expired')
  }
}
