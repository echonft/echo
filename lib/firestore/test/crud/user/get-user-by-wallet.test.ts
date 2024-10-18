import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import { Chain } from '@echo/utils/constants/chain'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - getUserByWallet', () => {
  it('returns undefined if the wallet does not exist', async () => {
    const owner = await getUserByWallet({ address: '0xnotfound', chain: Chain.Blast })
    expect(owner).toBeUndefined()
  })
  it('returns the wallet owner if wallet exists', async () => {
    const ownerUsername = userMockJohnnyUsername()
    const wallet = getWalletMockByUsername(ownerUsername)
    const owner = await getUserByWallet(wallet)
    const user = await getUserByUsername(ownerUsername)
    expect(owner).toBeDefined()
    expect(user).toBeDefined()
    expect(owner).toStrictEqual(user)
  })
})
