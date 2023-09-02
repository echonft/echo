import { BadRequestError } from '../error/bad-request-error'
import { Offer } from '@echo/firestore-types'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw new BadRequestError()
  }
}
