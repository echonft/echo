import { getAllListings } from '@echo/firestore-test/listing/get-all-listings'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { contentEq } from '@echo/utils/fp/content-eq'
import { expect } from '@jest/globals'

export async function assertListings() {
  const documents = await getAllListings()
  expect(contentEq(documents, getAllListingMocks())).toBeTruthy()
}
