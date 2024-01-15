import { userHasWallet } from '@echo/model/helpers/user/user-has-wallet'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { describe, expect, it } from '@jest/globals'

describe('helpers - user - userHasWallet', () => {
  it('should return false when the user has no wallets', () => {
    const user = {
      wallets: []
    } as unknown as AuthUser
    const wallet = {
      address: '0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e',
      chainId: 1
    } as unknown as Wallet
    expect(userHasWallet(user, wallet)).toBe(false)
  })

  it("should return true when the user has one or more wallets and the given wallet is present in the user's wallets list", () => {
    const user = {
      wallets: [
        {
          address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
          chainId: 1
        } as unknown as Wallet,
        {
          address: '0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e',
          chainId: 1
        } as unknown as Wallet
      ]
    } as unknown as AuthUser
    const wallet = {
      address: '0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e',
      chainId: 1
    } as unknown as Wallet
    expect(userHasWallet(user, wallet)).toBe(true)
  })

  it("should return false when the user has one or more wallets and the given wallet is not present in the user's wallets list", () => {
    const user = {
      wallets: [
        {
          address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
          chainId: 1
        } as unknown as Wallet,
        {
          address: '0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e',
          chainId: 1
        } as unknown as Wallet
      ]
    } as unknown as AuthUser
    const wallet = {
      address: '0xDifferentAddress',
      chainId: 1
    } as unknown as Wallet
    expect(userHasWallet(user, wallet)).toBe(false)
  })

  it("should return false when the user has one or more wallets and the given wallet is not present in the user's wallets list (different chain)", () => {
    const user = {
      wallets: [
        {
          address: '0xf672715f2bA85794659a7150e8C21F8d157bFe1D',
          chainId: 1
        } as unknown as Wallet,
        {
          address: '0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e',
          chainId: 1
        } as unknown as Wallet
      ]
    } as unknown as AuthUser
    const wallet = {
      address: '0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e',
      chainId: 2
    } as unknown as Wallet
    expect(userHasWallet(user, wallet)).toBe(false)
  })
})
