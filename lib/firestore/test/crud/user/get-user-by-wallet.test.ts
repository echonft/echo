import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { Chain } from '@echo/model/constants/chain'
import { userMockJohnnyUsername } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getUserByWallet', () => {
  it('returns undefined if the wallet does not exist', async () => {
    const owner = await getUserByWallet({ address: '0xnotfound', chain: Chain.Blast })
    expect(owner).toBeUndefined()
  })
  it('returns the wallet owner if wallet exists', async () => {
    const ownerUsername = userMockJohnnyUsername()
    const wallet = walletMockCrew
    const owner = await getUserByWallet(wallet)
    const user = await getUserByUsername(ownerUsername)
    expect(owner).toBeDefined()
    expect(user).toBeDefined()
    expect(owner).toStrictEqual(user)
  })
})
