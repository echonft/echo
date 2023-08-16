import { findUserByWallet } from '../../../src/crud/user/find-user-by-wallet'
import { userFirestoreData } from '../../mocks/user/user-firestore-data'
import { describe, expect, test } from '@jest/globals'

describe('crud - user - findUserByWallet', () => {
  const user = userFirestoreData['oE6yUEQBPn7PZ89yMjKn']!
  const wallet = user.wallets[0]!
  test('no user is found if wallet is not on the proper chain', async () => {
    const wrongChainWallet = { ...wallet, chainId: 0 }
    try {
      await findUserByWallet(wrongChainWallet)
    } catch (error) {
      expect(error).toBe('User not found')
    }
  })
  test('no user is found if wallet address is not found', async () => {
    const wrongChainWallet = { ...wallet, address: '0xtest' }
    try {
      await findUserByWallet(wrongChainWallet)
    } catch (error) {
      expect(error).toBe('User not found')
    }
  })
  test('user is found with proper wallet', async () => {
    const foundUser = await findUserByWallet(wallet)
    expect(foundUser).toEqual(user)
  })
})
