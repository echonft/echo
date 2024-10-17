import { offerMock } from '@echo/model/mocks/offer/offer-mock'
import { type Offer } from '@echo/model/types/offer/offer'
import { type NonEmptyArray, pipe, values } from 'ramda'

export function getAllOfferMocks() {
  return pipe(offerMock, values)() as NonEmptyArray<Offer>
}
