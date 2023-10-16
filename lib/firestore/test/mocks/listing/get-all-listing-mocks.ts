import { listingMock } from '@echo/firestore-mocks/listing/listing-mock'
import type { Listing } from '@echo/model/types/listing'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllListingMocks() {
  return Object.values(listingMock) as NonEmptyArray<Listing>
}
