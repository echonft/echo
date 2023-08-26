import { getAllListings } from '../../src/crud/listing/get-all-listings'
import { Listing } from '../../src/types/model/listing'
import { getAllListingMocks } from '../mocks/get-all-listing-mocks'
import { getListingMockById } from '../mocks/get-listing-mock-by-id'
import { expect } from '@jest/globals'
import { forEach } from 'ramda'

export async function assertListings() {
  const listingMocks = getAllListingMocks()
  const listings = await getAllListings()
  expect(listings.length).toEqual(listingMocks.length)
  forEach((listing: Listing) => {
    expect(getListingMockById(listing.id)).toStrictEqual(listing)
  }, listings)
}
