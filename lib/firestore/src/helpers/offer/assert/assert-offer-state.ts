import type { Offer } from '@echo/model/types/offer'
import type { OfferState } from '@echo/model/types/offer-state'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

function assertOfferIsNotCancelled(offer: Offer) {
  if (offer.state === 'CANCELLED') {
    throw Error('offer has already been cancelled')
  }
}

function assertOfferIsNotAccepted(offer: Offer) {
  if (offer.state === 'ACCEPTED') {
    throw Error('offer has already been accepted')
  }
}

function assertOfferIsNotRejected(offer: Offer) {
  if (offer.state === 'REJECTED') {
    throw Error('offer has already been rejected')
  }
}

function assertOfferIsNotCompleted(offer: Offer) {
  if (offer.state === 'COMPLETED') {
    throw Error('trade has already been completed')
  }
}

function assertOfferIsNotOpen(offer: Offer) {
  if (offer.state === 'OPEN') {
    throw Error('offer needs to be accepted or rejected first')
  }
}

export function assertOfferState(
  offer: Offer,
  toState: OfferState
): asserts offer is Offer & Record<'state', OfferState> {
  if (propIsNil('state', offer)) {
    throw Error('offer does not have a state')
  }

  switch (toState) {
    case 'REJECTED':
    case 'ACCEPTED':
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotAccepted(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotCompleted(offer)
      break
    case 'CANCELLED':
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotCompleted(offer)
      break
    case 'COMPLETED':
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotCompleted(offer)
      assertOfferIsNotOpen(offer)
      break
    case 'OPEN':
      throw Error('offer cannot go back to OPEN state')
  }
}
