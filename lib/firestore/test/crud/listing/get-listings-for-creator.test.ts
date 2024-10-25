import { getListingsForCreator } from '@echo/firestore/crud/listing/get-listings-for-creator'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - listing - getListingsForCreator', () => {
  it('returns an empty array if the user does not exist', async () => {
    const listings = await getListingsForCreator('not-found')
    expect(listings).toEqual([])
  })
  it('returns the listings created by the user', async () => {
    let listings = await getListingsForCreator(userMockCrew.username)
    expect(listings).toEqual([])
    listings = await getListingsForCreator(userMockJohnny.username)
    expect(listings.length).toBe(1)
    expect(listings[0]).toStrictEqual([listingMock])
  })
})
