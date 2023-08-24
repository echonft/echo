import { getAllListings } from '../../src/crud/listing/get-all-listings'
import { Listing } from '../../src/types/model/listing'
import { getAllListingMocks } from '../mocks/get-all-listing-mocks'
import { getListingMockById } from '../mocks/get-listing-mock-by-id'
import { expect } from '@jest/globals'
import { equals, forEach } from 'ramda'

export async function assertListings() {
  const listingMocks = getAllListingMocks()
  const listings = await getAllListings()
  expect(listings.length).toEqual(listingMocks.length)
  forEach((listing: Listing) => {
    const listingId = listing.id
    if (!equals(listing, getListingMockById(listingId))) {
      throw Error(`listing ${listingId} is different from mock`)
    }
  }, listings)
}
