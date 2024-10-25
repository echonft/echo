import { getPendingListingsForUser } from '@echo/firestore/crud/listing/get-pending-listings-for-user'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getPendingListingsForUser', () => {
  it('returns an empty array if the user does not exist', async () => {
    const listings = await getPendingListingsForUser('not-found')
    expect(listings).toEqual([])
  })
  it('returns the pending listings for a user', async () => {
    let listings = await getPendingListingsForUser(userMockJohnny.username)
    expect(listings).toEqual([])
    listings = await getPendingListingsForUser(userMockCrew.username)
    expect(listings.length).toBe(1)
    expect(listings).toEqualList([listingDocumentMock])
  })
})
