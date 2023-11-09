import { type OfferThread } from '@echo/firestore/types/model/offer-thread/offer-thread'
import { offerThreadMock } from '@echo/firestore-mocks/offer-thread/offer-thread-mock'
import { type NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllOfferThreadMocks() {
  return Object.values(offerThreadMock) as NonEmptyArray<OfferThread>
}
