import { Offer, OfferState } from '@echo/firestore-types'

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

function assertOfferIsNotInvalid(offer: Offer) {
  if (offer.state === 'INVALID') {
    throw Error('offer is not valid')
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

export function assertOfferState(offer: Offer, toState: OfferState) {
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
