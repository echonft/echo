import type { Offer } from '@echo/firestore-types'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw new BadRequestError('offer is nil')
  }
}
