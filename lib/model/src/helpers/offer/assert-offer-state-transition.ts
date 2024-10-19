import { OfferState } from '@echo/model/constants/offer-state'
import { type Offer } from '@echo/model/types/offer/offer'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertOfferStateTransition(
  offer: Nullable<Offer>,
  toState: OfferState
): asserts offer is Omit<Offer, 'state'> & Record<'state', OfferState> {
  if (isNil(offer)) {
    throw Error('offer is not defined')
  }
  if (offer.locked) {
    throw Error('offer is read only')
  }

  switch (toState) {
    case OfferState.Open:
      throw Error('offer cannot go back to OPEN state')
    case OfferState.Rejected:
    case OfferState.Accepted:
      if (offer.state === OfferState.Accepted) {
        throw Error('offer has already been accepted')
      }
      break
    case OfferState.Cancelled:
      if (offer.state !== OfferState.Open) {
        throw Error('offer cannot be cancelled when it is not OPEN')
      }
      break
    case OfferState.Completed:
      if (offer.state === OfferState.Open) {
        throw Error('offer needs to be accepted or rejected first')
      }
      break
  }
}
