import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { getAllListingMocks } from '@echo/model/mocks/listing/get-all-listing-mocks'
import { eqList } from '@echo/utils/fp/eq-list'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing- getAllListings', () => {
  it('get all listings', async () => {
    const listings = await getAllListings()
    expect(eqList(listings, getAllListingMocks())).toBeTruthy()
  })
})
