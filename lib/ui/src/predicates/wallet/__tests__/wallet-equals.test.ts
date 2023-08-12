import { Wallet } from '../../../types/wallet'
import { walletEquals } from '../wallet-equals'
import { describe, expect, it } from '@jest/globals'

describe('predicates - wallet - walletEquals', () => {
  const wallet1: Wallet = { address: '0xtest', chainId: 0 }
  const wallet2: Wallet = { address: '0x123456', chainId: 1 }
  it('different wallets returns false', () => {
    expect(walletEquals(wallet1)(wallet2)).toBeFalsy()
    expect(walletEquals(wallet2)(wallet1)).toBeFalsy()
  })
  it('wallets on a different chain returns false', () => {
    const wallet1DifferentChain = { ...wallet1, chainId: 1 }
    expect(walletEquals(wallet1)(wallet1DifferentChain)).toBeFalsy()
    expect(walletEquals(wallet1DifferentChain)(wallet1)).toBeFalsy()
  })
  it('wallets with a same chain but different address returns false', () => {
    const wallet1DifferentAddress = { ...wallet1, address: '0x12345' }
    expect(walletEquals(wallet1)(wallet1DifferentAddress)).toBeFalsy()
    expect(walletEquals(wallet1DifferentAddress)(wallet1)).toBeFalsy()
  })
  it('same wallet returns true', () => {
    expect(walletEquals(wallet1)({ chainId: 0, address: '0xtest' })).toBeTruthy()
    expect(walletEquals(wallet2)({ chainId: 1, address: '0x123456' })).toBeTruthy()
  })
})
