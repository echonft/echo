import { getUserListingsCount } from '@echo/firestore/crud/user-counts/get-user-listings-count'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('getUserListingsCount', () => {
  it('returns 0 if there are no listings for the user', async () => {
    const count = await getUserListingsCount('not-found')
    expect(count).toEqual(0)
  })
  it('returns the listing count for the user', async () => {
    const username = userMockJohnnyUsername()
    const count = await getUserListingsCount(username)
    expect(count).toEqual(1)
  })
})
