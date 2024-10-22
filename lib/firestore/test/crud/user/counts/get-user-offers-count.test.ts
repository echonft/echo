import { getUserOffersCount } from '@echo/firestore/crud/user/counts/get-user-offers-count'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - counts - getUserOffersCount', () => {
  it('returns 0 if there are no offer for the collection', async () => {
    const count = await getUserOffersCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the offer count for the user', async () => {
    const username = userMockJohnnyUsername()
    const count = await getUserOffersCount(username)
    expect(count).toEqual(2)
  })
})
