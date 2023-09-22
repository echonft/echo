import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'

function assertOfferIsNotCancelled(offer: Partial<FirestoreOffer>) {
  if (offer.state === 'CANCELLED') {
    throw Error('offer has already been cancelled')
  }
}

function assertOfferIsNotAccepted(offer: Partial<FirestoreOffer>) {
  if (offer.state === 'ACCEPTED') {
    throw Error('offer has already been accepted')
  }
}

function assertOfferIsNotRejected(offer: Partial<FirestoreOffer>) {
  if (offer.state === 'REJECTED') {
    throw Error('offer has already been rejected')
  }
}

function assertOfferIsNotInvalid(offer: Partial<FirestoreOffer>) {
  if (offer.state === 'INVALID') {
    throw Error('offer is not valid')
  }
}

function assertOfferIsNotCompleted(offer: Partial<FirestoreOffer>) {
  if (offer.state === 'COMPLETED') {
    throw Error('trade has already been completed')
  }
}

function assertOfferIsNotOpen(offer: Partial<FirestoreOffer>) {
  if (offer.state === 'OPEN') {
    throw Error('offer needs to be accepted or rejected first')
  }
}

export function assertOfferState(
  offer: Partial<FirestoreOffer>,
  toState: FirestoreOfferState
): asserts offer is Partial<FirestoreOffer> & {
  state: FirestoreOfferState
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
