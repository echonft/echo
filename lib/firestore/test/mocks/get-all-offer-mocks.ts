import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import { offerMock } from '@echo/firestore-mocks/offer-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllOfferMocks() {
  return Object.values(offerMock) as NonEmptyArray<FirestoreOffer>
}
