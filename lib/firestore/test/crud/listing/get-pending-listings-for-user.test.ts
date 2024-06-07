import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { userMockCrewUsername, userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForUser', () => {
  it('returns an empty array if the user does not exist', async () => {
    const listings = await getPendingListingsForUser('not-found')
    expect(listings).toEqual([])
  })
  it('returns the pending listings for a user', async () => {
    let listings = await getPendingListingsForUser(userMockJohnnyUsername())
    expect(listings).toEqual([])
    listings = await getPendingListingsForUser(userMockCrewUsername())
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById(listingMockId()))
  })
})
