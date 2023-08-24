import { ApiError } from '../api-error'
import { Offer } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertOffer = (offer: Offer | undefined) => {
  if (isNil(offer)) {
    throw new ApiError(400, 'Invalid offer id')
  }
  if (offer.expired) {
    throw new ApiError(400, 'Offer is expired')
  }
  if (offer.state === 'ACCEPTED') {
    throw new ApiError(400, 'Offer has already been accepted')
  }
  if (offer.state === 'REJECTED') {
    throw new ApiError(400, 'Offer has already been rejected')
  }
  if (offer.state === 'CANCELLED') {
    throw new ApiError(400, 'Offer has already been cancelled')
  }
  if (offer.state === 'INVALID') {
    throw new ApiError(400, 'Offer is not valid')
  }
}
