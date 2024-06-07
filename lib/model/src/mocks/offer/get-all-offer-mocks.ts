import { type Offer } from '@echo/model/types/offer'
import { offerMock } from '@echo/model/mocks/offer/offer-mock'
import { type NonEmptyArray } from 'ramda'

export function getAllOfferMocks() {
  return Object.values(offerMock) as NonEmptyArray<Offer>
}
