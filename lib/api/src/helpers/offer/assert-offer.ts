import { BadRequestError } from '../error/bad-request-error'
import { Offer } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertOffer = (offer: Offer | undefined) => {
  if (isNil(offer)) {
    throw new BadRequestError()
  }
}
