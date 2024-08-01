import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getWalletOwner } from '@echo/firestore/crud/wallet/get-wallet-owner'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - wallet - getWalletOwner', () => {
  it('returns undefined if the wallet does not exist', async () => {
    const owner = await getWalletOwner({ address: '0xnotfound', chain: 'blast' })
    expect(owner).toBeUndefined()
  })
  it('returns the wallet owner if wallet exists', async () => {
    const ownerUsername = userMockJohnnyUsername()
    const wallet = getWalletMockByUsername(ownerUsername)
    const owner = await getWalletOwner(wallet)
    const user = await getUserByUsername(ownerUsername)
    expect(owner).toBeDefined()
    expect(user).toBeDefined()
    expect(owner).toStrictEqual(user)
  })
})
