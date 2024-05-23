import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { USER_MOCK_CREW_USERNAME, USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsForCreator', () => {
  it('returns an empty array if the user does not exist', async () => {
    const listings = await getListingsForCreator('not-found')
    expect(listings).toEqual([])
  })
  it('returns the listings created by the user', async () => {
    let listings = await getListingsForCreator(USER_MOCK_CREW_USERNAME)
    expect(listings).toEqual([])
    listings = await getListingsForCreator(USER_MOCK_JOHNNY_USERNAME)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual(getListingMockById(LISTING_MOCK_ID))
  })
})
