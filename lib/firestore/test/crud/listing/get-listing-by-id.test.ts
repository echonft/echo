import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('CRUD - listing - getListingById', () => {
  it('returns undefined if the listing is not found', async () => {
    await expect(getListingById('not-found')).resolves.toBeUndefined()
  })
  it('returns the listing with the given id', async () => {
    const listing = await pipe(listingMockId, getListingById)()
    expect(listing).toStrictEqual(pipe(listingMockId, getListingMockById)())
  })
})
