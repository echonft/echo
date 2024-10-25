import { getUserNftsCount } from '@echo/firestore/crud/user/counts/get-user-nfts-count'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - counts - getUserNftsCount', () => {
  it('returns 0 if there are no listings for the user', async () => {
    const count = await getUserNftsCount('not-found')
    expect(count).toEqual(0)
  })

  it('returns the nft count for the user', async () => {
    const username = userMockJohnny.username
    const count = await getUserNftsCount(username)
    expect(count).toEqual(4)
  })
})
