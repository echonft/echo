import { getAllListings } from '../../../src/crud/listing/get-all-listings'
import { getAllListingMocks } from '../../mocks/get-all-listing-mocks'
import { getListingMockById } from '../../mocks/get-listing-mock-by-id'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Listing } from '@echo/firestore-types'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { forEach } from 'ramda'

describe('CRUD - listing- getAllListings', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('get all listings', async () => {
    const listingMocks = getAllListingMocks()
    const listings = await getAllListings()
    expect(listings.length).toEqual(listingMocks.length)
    forEach((listing: Listing) => {
      expect(getListingMockById(listing.id)).toStrictEqual(listing)
    }, listings)
  })
})
