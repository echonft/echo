import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { isNil } from 'ramda'

export function assertOffer(offer: FirestoreOffer | undefined): asserts offer is NonNullable<FirestoreOffer> {
  if (isNil(offer)) {
    throw new BadRequestError('offer is nil')
  }
}
