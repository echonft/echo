import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { removeUserWallet } from '../../../src/crud/user/remove-user-wallet'
import { updateUser } from '../../../src/crud/user/update-user'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { Wallet } from '../../../src/types/model/wallet'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { includes } from 'ramda'

describe('CRUD - user - addUserWallet', () => {
  let initialWallets: Wallet[]
  const id = 'oE6yUEQBPn7PZ89yMjKn'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const user = await findUserById(id)
    initialWallets = user!.wallets
  })
  afterEach(async () => {
    await updateUser(id, { wallets: initialWallets })
  })

  it('does nothing if the wallet is not already in the user wallets', async () => {
    await removeUserWallet(id, {
      address: '0xnewAdress',
      chainId: 0
    })
    const updatedUser = await findUserById(id)
    const { wallets } = updatedUser!
    expect(wallets).toEqual(initialWallets)
  })

  it('add the wallet if its not in the user wallets', async () => {
    const wallet = initialWallets[0]!
    await removeUserWallet(id, wallet)
    const updatedUser = await findUserById(id)
    const { wallets } = updatedUser!
    expect(wallets.length).toEqual(initialWallets.length - 1)
    expect(includes(wallet, wallets)).toBeFalsy()
  })
})
