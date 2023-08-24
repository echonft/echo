import { ApiError } from '../error/api-error'
import { Offer } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertOffer = (offer: Offer | undefined) => {
  if (isNil(offer)) {
    throw new ApiError(400, 'Invalid offer id')
  }
}
