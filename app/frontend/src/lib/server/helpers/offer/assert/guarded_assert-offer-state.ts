import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { assertOfferState as modelAssertOfferState } from '@echo/model/helpers/offer/assert/assert-offer-state'
import { type Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'

export function guarded_assertOfferState(
  offer: Offer,
  toState: OfferState
): asserts offer is Omit<Offer, 'state'> & Record<'state', OfferState> {
  try {
    modelAssertOfferState(offer, toState)
  } catch (err) {
    throw new BadRequestError(`offer with id ${offer.id} state is wrong`)
  }
}
