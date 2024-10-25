import { getUserSwapsCount } from '@echo/firestore/crud/user/counts/get-user-swaps-count'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - counts - getUserSwapsCount', () => {
  it('returns 0 if there are no swaps for the user', async () => {
    const count = await getUserSwapsCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the swap count for the user', async () => {
    // TODO add swaps
    const username = userMockJohnnyUsername()
    const count = await getUserSwapsCount(username)
    expect(count).toEqual(0)
  })
})
