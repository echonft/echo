import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { assertOfferStateTransition } from '@echo/model/helpers/offer/assert/assert-offer-state-transition'
import { type Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'

export function assertOfferState(
  offer: Offer,
  toState: OfferState
): asserts offer is Omit<Offer, 'state'> & Record<'state', OfferState> {
  try {
    assertOfferStateTransition(offer, toState)
  } catch (err) {
    throw new BadRequestError()
  }
}
