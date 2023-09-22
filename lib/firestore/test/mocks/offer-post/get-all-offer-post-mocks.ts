import type { FirestoreOfferPost } from '@echo/firestore/types/model/offer-post/firestore-offer-post'
import { offerPostMock } from '@echo/firestore-mocks/offer-post/offer-post-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllOfferPostMocks() {
  return Object.values(offerPostMock) as NonEmptyArray<FirestoreOfferPost>
}
