import { findUserByWallet } from '../find-user-by-wallet'
import { mockUser } from '@echo/model'
import { describe, expect, test } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - user - findUserByWallet', () => {
  const user = mockUser
  const wallet = user.wallets![0]!
  test('no user is found if wallet is not on the proper chain', async () => {
    const wrongChainWallet = { ...wallet, chainId: 0 }
    const userResult = await findUserByWallet(wrongChainWallet)
    expect(R.isError(userResult)).toBeTruthy()
    R.tapError(userResult, (error) => expect(error).toBe('User not found'))
  })
  test('no user is found if wallet address is not found', async () => {
    const wrongChainWallet = { ...wallet, address: '0xtest' }
    const userResult = await findUserByWallet(wrongChainWallet)
    expect(R.isError(userResult)).toBeTruthy()
    R.tapError(userResult, (error) => expect(error).toBe('User not found'))
  })
  test('user is found with proper wallet', async () => {
    const userResult = await findUserByWallet(wallet)
    expect(R.getExn(userResult)).toStrictEqual(user)
  })
})
