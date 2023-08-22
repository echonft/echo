import { addUserWallet } from '../../../src/crud/user/add-user-wallet'
import { findUserById } from '../../../src/crud/user/find-user-by-id'
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

  it('does nothing if the wallet is already in the user wallets', async () => {
    await addUserWallet(id, initialWallets[0]!)
    const updatedUser = await findUserById(id)
    const { wallets } = updatedUser!
    expect(wallets).toEqual(initialWallets)
  })

  it('add the wallet if its not in the user wallets', async () => {
    const newWallet = {
      address: '0xnewAdress',
      chainId: 0
    }
    await addUserWallet(id, newWallet)
    const updatedUser = await findUserById(id)
    const { wallets } = updatedUser!
    expect(wallets.length).toEqual(initialWallets.length + 1)
    expect(includes(newWallet, wallets)).toBeTruthy()
  })
})
