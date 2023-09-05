import { Id, Offer } from '@echo/firestore-types'
import { propIsNil } from '@echo/utils'
import { isNil } from 'ramda'

export function assertOffer(offer: Partial<Offer> | undefined): asserts offer is NonNullable<Partial<Offer>> & Id {
  if (isNil(offer)) {
    throw Error('offer is not defined')
  }
  if (propIsNil('id', offer)) {
    throw Error('offer does not have an id')
  }
}
