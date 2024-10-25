import { getAllListings } from '@echo/firestore/crud/listing/get-all-listings'
import { listingDocumentMocks } from '@echo/test/firestore/initialize-db'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing- getAllListings', () => {
  it('get all listings', async () => {
    const listings = await getAllListings()
    expect(listings).toEqualList(listingDocumentMocks)
  })
})
