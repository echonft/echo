import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForUser', () => {
  it('returns an empty array if the user does not exist', async () => {
    const listings = await getPendingListingsForUser('not-found')
    expect(listings).toEqual([])
  })
  it('returns the pending listings for a user', async () => {
    let listings = await getPendingListingsForUser('johnnycagewins')
    expect(listings).toEqual([])
    listings = await getPendingListingsForUser('crewnft_')
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById('jUzMtPGKM62mMhEcmbN4'))
  })
})
