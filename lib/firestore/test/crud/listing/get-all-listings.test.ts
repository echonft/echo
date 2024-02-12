import { getAllListings } from '@echo/firestore-test/listing/get-all-listings'
import { type Listing } from '@echo/model/types/listing'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - listing- getAllListings', () => {
  it('get all listings', async () => {
    const listingMocks = getAllListingMocks()
    const listings = await getAllListings()
    expect(listings.length).toEqual(listingMocks.length)
    forEach((listing: Listing) => {
      expect(getListingMockById(listing.id)).toStrictEqual(listing)
    }, listings)
  })
})
