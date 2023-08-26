import { findUserByWallet } from '../../../src/crud/user/find-user-by-wallet'
import { userMock } from '../../mocks/user-mock'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByWallet', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('returns undefined if the address is wrong', async () => {
    const user = await findUserByWallet({ address: 'wrong', chainId: 1 })
    expect(user).toBeUndefined()
  })

  it('returns undefined if the chain id is wrong', async () => {
    const user = await findUserByWallet({ address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 0 })
    expect(user).toBeUndefined()
  })

  it('returns undefined if both the address and the chain id are wrong', async () => {
    const user = await findUserByWallet({ address: 'wrong', chainId: 0 })
    expect(user).toBeUndefined()
  })

  it('returns the user with the given wallet', async () => {
    const user = await findUserByWallet({ address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE', chainId: 1 })
    expect(user).toStrictEqual(userMock['oE6yUEQBPn7PZ89yMjKn'])
  })
})
