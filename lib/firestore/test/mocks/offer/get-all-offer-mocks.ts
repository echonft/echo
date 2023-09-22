import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { offerMock } from '@echo/firestore-mocks/offer/offer-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllOfferMocks() {
  return Object.values(offerMock) as NonEmptyArray<FirestoreOffer>
}
