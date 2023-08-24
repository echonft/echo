import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { updateUser } from '../../../src/crud/user/update-user'
import { updateUserWallets } from '../../../src/crud/user/update-user-wallets'
import { Wallet } from '../../../src/types/model/wallet'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - user - updateUserWallets', () => {
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

  it('updateUserWallets', async () => {
    const newWallet = {
      address: '0xnewAdress',
      chainId: 0
    }
    await updateUserWallets(id, [newWallet])
    const updatedUser = await findUserById(id)
    const { wallets } = updatedUser!
    expect(wallets.length).toEqual(1)
    expect(wallets[0]).toStrictEqual(newWallet)
  })
})
