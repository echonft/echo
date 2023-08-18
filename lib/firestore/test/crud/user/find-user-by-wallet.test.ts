import { findUserByWallet } from '../../../src/crud/user/find-user-by-wallet'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { userMock } from '../../mocks/user-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByWallet', () => {
  beforeAll(initialize)
  afterAll(terminate)

  it('throws an error if the address is wrong', async () => {
    try {
      await findUserByWallet({ address: 'wrong', chainId: 1 })
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('throws an error if the chain id is wrong', async () => {
    try {
      await findUserByWallet({ address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 0 })
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('throws an error if both the address and the chain id are wrong', async () => {
    try {
      await findUserByWallet({ address: 'wrong', chainId: 0 })
      expect(false).toBeTruthy()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('returns the user with the given wallet', async () => {
    const user = await findUserByWallet({ address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 1 })
    expect(user).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn'])
  })
})
