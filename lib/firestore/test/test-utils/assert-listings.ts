import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { getAllListingMocks } from '@echo/firestore-mocks/get-all-listing-mocks'
import { getListingMockById } from '@echo/firestore-mocks/get-listing-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertListings() {
  const listingMocks = getAllListingMocks()
  const listings = await getAllListings()
  expect(listings.length).toEqual(listingMocks.length)
  forEach((listing: FirestoreListing) => {
    expect(getListingMockById(listing.id)).toStrictEqual(listing)
  }, listings)
}
