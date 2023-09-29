import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import type { FirestoreOfferState } from '@echo/firestore/types/model/offer/firestore-offer-state'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { includes } from 'ramda'

export function assertOfferState(
  offer: FirestoreOffer,
  ...states: FirestoreOfferState[]
): asserts offer is FirestoreOffer & { state: FirestoreOfferState } {
  if (!includes(offer.state, states)) {
    throw new BadRequestError(
      `offer with id ${offer.id} and state ${offer.state} was expected to have any state contained in ${JSON.stringify(
        states
      )}`
    )
  }
}
