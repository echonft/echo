import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { LISTING_MOCK_ID, listingMock } from '@echo/model-mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingById', () => {
  it('returns undefined if the listing is not found', async () => {
    const listing = await getListingById('not-found')
    expect(listing).toBeUndefined()
  })
  it('returns the listing with the given id', async () => {
    const listing = await getListingById(LISTING_MOCK_ID)
    expect(listing).toStrictEqual(listingMock.jUzMtPGKM62mMhEcmbN4)
  })
})
