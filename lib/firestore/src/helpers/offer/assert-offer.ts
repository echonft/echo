import { Offer } from '../../types/model/offer'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined) {
  if (isNil(offer)) {
    throw Error('invalid offer id')
  }
  if (offer.expired) {
    throw Error('offer is expired')
  }
}
