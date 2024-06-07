import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { getAllListingMocks } from '@echo/model/mocks/listing/get-all-listing-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { expect } from '@jest/globals'

export async function assertListings() {
  const documents = await getAllListings()
  expect(eqListContent(documents, getAllListingMocks())).toBeTruthy()
}
