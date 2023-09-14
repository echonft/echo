import { getUserWalletAddresses } from '@echo/firestore/helpers/user/get-user-wallet-addresses'
import { userMock } from '@echo/firestore-mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { clearDb } from '@test-utils/clear-db'
import { initializeDb } from '@test-utils/initialize-db'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('helpers - user - getUserWalletAddresses', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('Should return the user wallets addresses with the given chain id', async () => {
    await clearDb()
    await initializeDb()
    expect(true).toBeTruthy()
  })

  it('Should return the user wallets addresses with the given chain id', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const addresses = getUserWalletAddresses(1, user)
    expect(addresses.length).toEqual(user.wallets.length)
    expect(addresses[0]).toStrictEqual(user.wallets[0]!.address)
    expect(addresses[1]).toStrictEqual(user.wallets[1]!.address)
    expect(addresses[2]).toStrictEqual(user.wallets[2]!.address)
    expect(addresses[3]).toStrictEqual(user.wallets[3]!.address)
    expect(getUserWalletAddresses(0)(user).length).toEqual(0)
  })
})
