import { getUserCounts } from '@echo/firestore/crud/user/counts/get-user-counts'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - counts - getUserCounts', () => {
  it('returns the counts for the user', async () => {
    const username = userMockJohnnyUsername()
    const userCounts = await getUserCounts(username)
    expect(userCounts.listingsCount).toEqual(1)
    expect(userCounts.nftsCount).toEqual(4)
    expect(userCounts.offersCount).toEqual(2)
    expect(userCounts.swapsCount).toEqual(0)
  })
})
