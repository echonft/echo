import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { type Offer } from '@echo/model/types/offer'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertOffer(offer: Nullable<Offer>): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw new BadRequestError('offer is nil')
  }
}
