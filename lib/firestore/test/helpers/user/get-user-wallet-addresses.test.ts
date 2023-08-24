import { getUserWalletAddresses } from '../../../src/helpers/user/get-user-wallet-addresses'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { userMock } from '../../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('helpers - user - getUserWalletAddresses', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('Should return the user wallets addresses with the given chain id', () => {
    const user = userMock['oE6yUEQBPn7PZ89yMjKn']!
    const addresses = getUserWalletAddresses(1)(user)
    expect(addresses.length).toEqual(user.wallets.length)
    expect(addresses[0]).toStrictEqual(user.wallets[0]!.address)
    expect(addresses[1]).toStrictEqual(user.wallets[1]!.address)
    expect(addresses[2]).toStrictEqual(user.wallets[2]!.address)
    expect(addresses[3]).toStrictEqual(user.wallets[3]!.address)
    expect(getUserWalletAddresses(0)(user).length).toEqual(0)
  })
})
