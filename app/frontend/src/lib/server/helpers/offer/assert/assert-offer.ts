import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { type Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw new BadRequestError('offer is nil')
  }
}
