import { findListingById } from '@echo/firestore/crud/listing/find-listing-by-id'
import { listingMock } from '@echo/model-mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - findListingById', () => {
  it('returns undefined if the listing is not found', async () => {
    const listing = await findListingById('not-found')
    expect(listing).toBeUndefined()
  })
  it('returns the listing with the given id', async () => {
    const listing = await findListingById('jUzMtPGKM62mMhEcmbN4')
    expect(listing).toStrictEqual(listingMock.jUzMtPGKM62mMhEcmbN4)
  })
})
