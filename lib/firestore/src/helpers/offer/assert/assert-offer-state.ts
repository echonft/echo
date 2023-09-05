import { Offer, OfferState } from '@echo/firestore-types'
import { propIsNil } from '@echo/utils'

function assertOfferIsNotCancelled(offer: Partial<Offer>) {
  if (offer.state === 'CANCELLED') {
    throw Error('offer has already been cancelled')
  }
}

function assertOfferIsNotAccepted(offer: Partial<Offer>) {
  if (offer.state === 'ACCEPTED') {
    throw Error('offer has already been accepted')
  }
}

function assertOfferIsNotRejected(offer: Partial<Offer>) {
  if (offer.state === 'REJECTED') {
    throw Error('offer has already been rejected')
  }
}

function assertOfferIsNotInvalid(offer: Partial<Offer>) {
  if (offer.state === 'INVALID') {
    throw Error('offer is not valid')
  }
}

function assertOfferIsNotCompleted(offer: Partial<Offer>) {
  if (offer.state === 'COMPLETED') {
    throw Error('trade has already been completed')
  }
}

function assertOfferIsNotOpen(offer: Partial<Offer>) {
  if (offer.state === 'OPEN') {
    throw Error('offer needs to be accepted or rejected first')
  }
}

export function assertOfferState(
  offer: Partial<Offer>,
  toState: OfferState
): asserts offer is Partial<Offer> & {
  state: OfferState
} {
  if (propIsNil('state', offer)) {
    throw Error('offer does not have a state')
  }

  switch (toState) {
    case 'REJECTED':
    case 'ACCEPTED':
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotAccepted(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotInvalid(offer)
      assertOfferIsNotCompleted(offer)
      break
    case 'INVALID':
    case 'CANCELLED':
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotInvalid(offer)
      assertOfferIsNotCompleted(offer)
      break
    case 'COMPLETED':
      assertOfferIsNotCancelled(offer)
      assertOfferIsNotRejected(offer)
      assertOfferIsNotInvalid(offer)
      assertOfferIsNotCompleted(offer)
      assertOfferIsNotOpen(offer)
      break
    case 'OPEN':
      throw Error('offer cannot go back to OPEN state')
  }
}
