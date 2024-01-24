import { getAllListings } from '@echo/firestore-test/listing/get-all-listings'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type Listing } from '@echo/model/types/listing'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - listing- getAllListings', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('get all listings', async () => {
    const listingMocks = getAllListingMocks()
    const listings = await getAllListings()
    expect(listings.length).toEqual(listingMocks.length)
    forEach((listing: Listing) => {
      expect(getListingMockById(listing.id)).toStrictEqual(listing)
    }, listings)
  })
})
