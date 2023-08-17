import { getAllUserWalletAddresses } from '../../src/crud/user/get-all-user-wallet-addresses'
import { initialize } from '../../src/services/initialize'
import { terminate } from '../../src/services/terminate'
import { userMock } from '../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - getAllUserWalletAddresses', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('getAllUserWalletAddresses', async () => {
    const addresses = await getAllUserWalletAddresses()
    expect(addresses.length).toEqual(5)
    expect(addresses[0]).toStrictEqual(userMock['6rECUMhevHfxABZ1VNOm']!.wallets[0]!.address)
    expect(addresses[1]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[0]!.address)
    expect(addresses[2]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[1]!.address)
    expect(addresses[3]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[2]!.address)
    expect(addresses[4]).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[3]!.address)
  })
})
