import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { removeUserWallet } from '@echo/firestore/crud/user/remove-user-wallet'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { includes } from 'ramda'

describe('CRUD - user - addUserWallet', () => {
  let initialWallets: FirestoreWallet[]
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
