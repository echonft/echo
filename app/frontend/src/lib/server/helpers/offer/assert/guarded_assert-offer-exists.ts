import { NotFoundError } from '@echo/frontend/lib/server/helpers/error/not-found-error'
import type { Offer } from '@echo/model/types/offer'
import { isNil } from 'ramda'

export function guarded_assertOfferExists(
  offer: Offer | undefined,
  offerId: string
): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw new NotFoundError(`offer with id ${offerId} not found`)
  }
}
