import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { type Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

function assertOfferIsNotAccepted(offer: Offer) {
  if (offer.state === OFFER_STATE_ACCEPTED) {
    throw Error('offer has already been accepted')
  }
}

function assertOfferIsNotOpen(offer: Offer) {
  if (offer.state === OFFER_STATE_OPEN) {
    throw Error('offer needs to be accepted or rejected first')
  }
}

export function assertOfferState(
  offer: Offer,
  toState: OfferState
): asserts offer is Omit<Offer, 'state'> & Record<'state', OfferState> {
  if (propIsNil('state', offer)) {
    throw Error('offer does not have a state')
  }
  if (offer.readOnly) {
    throw Error('offer is read only')
  }

  switch (toState) {
    case OFFER_STATE_OPEN:
      throw Error('offer cannot go back to OPEN state')
    case OFFER_STATE_REJECTED:
    case OFFER_STATE_ACCEPTED:
      assertOfferIsNotAccepted(offer)
      break
    case OFFER_STATE_COMPLETED:
      assertOfferIsNotOpen(offer)
      break
  }
}
