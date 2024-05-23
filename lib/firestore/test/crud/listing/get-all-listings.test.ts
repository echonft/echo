import { getAllListings } from '@echo/firestore-test/listing/get-all-listings'
import { getAllListingMocks } from '@echo/model-mocks/listing/get-all-listing-mocks'
import { eqListContent } from '@echo/utils/fp/eq-list-content'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing- getAllListings', () => {
  it('get all listings', async () => {
    const listings = await getAllListings()
    expect(eqListContent(listings, getAllListingMocks())).toBeTruthy()
  })
})
