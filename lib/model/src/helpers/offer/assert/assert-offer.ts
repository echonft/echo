import { type Offer } from '@echo/model/types/offer'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export function assertOffer(offer: Offer | undefined): asserts offer is NonNullable<Offer> {
  if (isNil(offer)) {
    throw Error('offer is not defined')
  }
  if (propIsNil('id', offer)) {
    throw Error('offer does not have an id')
  }
}
