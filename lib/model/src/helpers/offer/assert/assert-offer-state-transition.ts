import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function assertOfferStateTransition(
  offer: Nullable<Offer>,
  toState: OfferState
): asserts offer is Omit<Offer, 'state'> & Record<'state', OfferState> {
  if (isNil(offer)) {
    throw Error('offer is not defined')
  }
  if (offer.readOnly) {
    throw Error('offer is read only')
  }

  switch (toState) {
    case OFFER_STATE_OPEN:
      throw Error('offer cannot go back to OPEN state')
    case OFFER_STATE_REJECTED:
    case OFFER_STATE_ACCEPTED:
      if (offer.state === OFFER_STATE_ACCEPTED) {
        throw Error('offer has already been accepted')
      }
      break
    case OFFER_STATE_CANCELLED:
      if (offer.state !== OFFER_STATE_OPEN) {
        throw Error('offer cannot be cancelled when it is not OPEN')
      }
      break
    case OFFER_STATE_COMPLETED:
      if (offer.state === OFFER_STATE_OPEN) {
        throw Error('offer needs to be accepted or rejected first')
      }
      break
  }
}
