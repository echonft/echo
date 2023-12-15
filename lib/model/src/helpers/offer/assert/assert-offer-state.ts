import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { assertOfferIsNotExpired } from '@echo/model/helpers/offer/assert/assert-offer-is-not-expired'
import { type Offer } from '@echo/model/types/offer'
import { type OfferState } from '@echo/model/types/offer-state'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

function assertOfferIsNotCancelled(offer: Offer) {
  if (offer.state === OFFER_STATE_CANCELLED) {
    throw Error('offer has already been cancelled')
  }
}

function assertOfferIsNotAccepted(offer: Offer) {
  if (offer.state === OFFER_STATE_ACCEPTED) {
    throw Error('offer has already been accepted')
  }
}

function assertOfferIsNotRejected(offer: Offer) {
  if (offer.state === OFFER_STATE_REJECTED) {
    throw Error('offer has already been rejected')
  }
}

function assertOfferIsNotCompleted(offer: Offer) {
  if (offer.state === OFFER_STATE_COMPLETED) {
    throw Error('trade has already been completed')
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
  assertOfferIsNotExpired(offer)

  switch (toState) {
    case OFFER_STATE_REJECTED:
    case OFFER_STATE_ACCEPTED:
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotAccepted(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotCompleted(offer)
      break
    case OFFER_STATE_CANCELLED:
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotCompleted(offer)
      break
    case OFFER_STATE_COMPLETED:
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotCompleted(offer)
      assertOfferIsNotOpen(offer)
      break
    case OFFER_STATE_OPEN:
      throw Error('offer cannot go back to OPEN state')
  }
}
