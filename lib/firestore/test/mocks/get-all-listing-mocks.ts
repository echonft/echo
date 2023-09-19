import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { listingMock } from '@echo/firestore-mocks/listing-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllListingMocks() {
  return Object.values(listingMock) as NonEmptyArray<FirestoreListing>
}
