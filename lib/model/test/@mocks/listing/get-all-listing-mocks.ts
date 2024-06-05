import { type Listing } from '@echo/model/types/listing'
import { listingMock } from '@echo/model-mocks/listing/listing-mock'
import { type NonEmptyArray } from 'ramda'

export function getAllListingMocks() {
  return Object.values(listingMock) as NonEmptyArray<Listing>
}
