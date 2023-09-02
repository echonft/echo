import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { removeUserWallet } from '../../../src/crud/user/remove-user-wallet'
import { updateUser } from '../../../src/crud/user/update-user'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { Wallet } from '@echo/firestore-types'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { includes } from 'ramda'

describe('CRUD - user - addUserWallet', () => {
  let initialWallets: Wallet[]
  const id = 'oE6yUEQBPn7PZ89yMjKn'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
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
