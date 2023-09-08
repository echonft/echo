import { getAllUserWalletAddresses } from '../../../src/helpers/user/get-all-user-wallet-addresses'
import { userMock } from '../../mocks/user-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - getAllUserWalletAddresses', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('getAllUserWalletAddresses', async () => {
    const addresses = await getAllUserWalletAddresses(1)
    expect(addresses.length).toEqual(5)
    expect(addresses[0]).toStrictEqual(userMock['6rECUMhevHfxABZ1VNOm']!.wallets[0]!.address)
    expect(addresses[1]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[0]!.address)
    expect(addresses[2]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[1]!.address)
    expect(addresses[3]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[2]!.address)
    expect(addresses[4]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[3]!.address)
  })
})
