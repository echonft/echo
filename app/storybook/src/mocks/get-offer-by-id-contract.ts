import { offerMockFromJohnnycage } from '@echo/model/mocks/offer-mock'
import type { Offer } from '@echo/model/types/offer'
import { rangeDelay } from 'delay'

export function getOfferByIdContract(): Promise<Offer> {
  return rangeDelay(800, 1600, { value: offerMockFromJohnnycage })
}
