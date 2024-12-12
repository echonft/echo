import { OfferState } from '@echo/model/constants/offer-state'
import { offerMockToJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { rangeDelay } from 'delay'
import { assoc, pipe } from 'ramda'

export function rejectOffer(): Promise<Offer> {
  const value = pipe(assoc('state', OfferState.Rejected), assoc('locked', true))(offerMockToJohnnycage)
  return rangeDelay(800, 1600, { value })
}
