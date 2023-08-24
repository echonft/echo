import { Offer } from '../../types/model/offer'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined) {
  if (isNil(offer)) {
    throw Error('invalid offer id')
  }
  if (offer.expired) {
    throw Error('offer is expired')
  }
  if (offer.state === 'ACCEPTED') {
    throw Error('offer has already been accepted')
  }
  if (offer.state === 'REJECTED') {
    throw Error('offer has already been rejected')
  }
  if (offer.state === 'CANCELLED') {
    throw Error('offer has already been cancelled')
  }
  if (offer.state === 'INVALID') {
    throw Error('offer is not valid')
  }
}
