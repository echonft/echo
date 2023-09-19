import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import type { FirestoreListing } from '@echo/firestore/types/model/firestore-listing'
import { getAllListingMocks } from '@echo/firestore-mocks/get-all-listing-mocks'
import { getListingMockById } from '@echo/firestore-mocks/get-listing-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
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
    forEach((listing: FirestoreListing) => {
      expect(getListingMockById(listing.id)).toStrictEqual(listing)
    }, listings)
  })
})
