import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing- getAllListings', () => {
  it('get all listings', async () => {
    const listings = await getAllListings()
    expect(listings).toEqual([listingMock])
  })
})
