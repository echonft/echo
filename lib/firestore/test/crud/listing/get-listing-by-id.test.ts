import { getListingById } from '@echo/firestore/crud/listing/get-listing-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingById', () => {
  it('returns undefined if the listing is not found', async () => {
    await expect(getListingById('not-found')).resolves.toBeUndefined()
  })
  it('returns the listing with the given id', async () => {
    const listing = await getListingById('')
    expect(listing).toStrictEqual(undefined)
  })
})
