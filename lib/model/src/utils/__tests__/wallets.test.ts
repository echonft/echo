import { Wallet } from '../../types'
import { addWallet, removeWallet } from '../wallets'
import { describe, expect, it } from '@jest/globals'

describe('utils - wallets', () => {
  const wallets: Wallet[] = [
    {
      address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
      chainId: 1
    },
    {
      address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
      chainId: 1
    }
  ]
  const wallet: Wallet = {
    address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
    chainId: 1
  }
  describe('addWallet', () => {
    it('adds a wallet in an empty array', () => {
      expect(addWallet([], wallet)).toEqual([wallet])
    })
    it('adds a wallet in an array', () => {
      expect(addWallet(wallets, wallet)).toEqual(wallets.concat(wallet))
    })
    it('not add a wallet that is already on the list', () => {
      expect(addWallet(wallets, wallets[0]!)).toEqual(wallets)
    })
  })

  describe('removeWallet', () => {
    it('removes nothing from an empty array', () => {
      expect(removeWallet([], wallet)).toEqual([])
    })
    it('removes the wallet from an existing array', () => {
      expect(removeWallet(wallets, wallets[0]!)).toEqual([wallets[1]])
    })
    it('removes nothing if the wallet is not in the array', () => {
      expect(removeWallet(wallets, wallet)).toEqual(wallets)
    })
  })
})
