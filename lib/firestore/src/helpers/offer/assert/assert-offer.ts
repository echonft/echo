import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export function assertOffer(offer: FirestoreOffer | undefined): asserts offer is NonNullable<FirestoreOffer> {
  if (isNil(offer)) {
    throw Error('offer is not defined')
  }
  if (propIsNil('id', offer)) {
    throw Error('offer does not have an id')
  }
}
