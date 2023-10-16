import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { includes } from 'ramda'

export function assertOfferState(
  offer: Offer,
  ...states: OfferState[]
): asserts offer is Offer & { state: OfferState } {
  if (!includes(offer.state, states)) {
    throw new BadRequestError(
      `offer with id ${offer.id} and state ${offer.state} was expected to have any state contained in ${JSON.stringify(
        states
      )}`
    )
  }
}
