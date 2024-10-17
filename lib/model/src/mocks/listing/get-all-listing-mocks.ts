import { listingMock } from '@echo/model/mocks/listing/listing-mock'
import { type Listing } from '@echo/model/types/listing/listing'
import { type NonEmptyArray, pipe, values } from 'ramda'

export function getAllListingMocks() {
  return pipe(listingMock, values)() as NonEmptyArray<Listing>
}
