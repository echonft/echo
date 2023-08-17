import { findUserById } from '../../src/crud/user/find-user-by-id'
import { updateUser } from '../../src/crud/user/update-user'
import { updateUserWallets } from '../../src/crud/user/update-user-wallets'
import { initialize } from '../../src/services/initialize'
import { terminate } from '../../src/services/terminate'
import { Wallet } from '../../src/types/model/wallet'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - user - setUserUpdatedAt', () => {
  let initialWallets: Wallet[]
  const id = 'oE6yUEQBPn7PZ89yMjKn'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const user = await findUserById(id)
    initialWallets = user.wallets
  })
  afterEach(async () => {
    await updateUser(id, { wallets: initialWallets })
  })

  it('setUserUpdatedAt', async () => {
    const newWallet = {
      address: '0xnewAdress',
      chainId: 0
    }
    await updateUserWallets(id, [newWallet])
    const updatedUser = await findUserById(id)
    const { wallets } = updatedUser
    expect(wallets.length).toEqual(1)
    expect(wallets[0]).toStrictEqual(newWallet)
  })
})
