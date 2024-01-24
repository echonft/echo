import { getAllListings } from '@echo/firestore-test/listing/get-all-listings'
import { type Listing } from '@echo/model/types/listing'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertListings() {
  const listingMocks = getAllListingMocks()
  const listings = await getAllListings()
  expect(listings.length).toEqual(listingMocks.length)
  forEach((listing: Listing) => {
    expect(listing).toStrictEqual(getListingMockById(listing.id))
  }, listings)
}
