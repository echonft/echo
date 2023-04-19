import { removeArrayFromArray, removeFromArray } from '../remove-from-array'
import { describe, expect, it } from '@jest/globals'

// TODO move these tests to utils
describe('array - removeFromArray', () => {
  const wallets = [
    {
      address: '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8',
      chainId: 1
    },
    {
      address: '0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9',
      chainId: 1
    }
  ]
  const wallet = {
    address: '0x5f8BF75666a6B4bC452DC4Ac680f0A8Ac35b25DE',
    chainId: 1
  }

  describe('removeFromArray', () => {
    it('removes nothing from an empty array', () => {
      expect(
        removeFromArray(
          [],
          wallet,
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual([])
    })
    it('removes the wallet from an existing array', () => {
      expect(
        removeFromArray(
          wallets,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          wallets[0]!,
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual([wallets[1]])
    })
    it('removes nothing if the wallet is not in the array', () => {
      expect(
        removeFromArray(
          wallets,
          wallet,
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual(wallets)
    })
  })
  describe('removeArrayFromArray', () => {
    it('removes nothing from an empty array', () => {
      expect(
        removeArrayFromArray(
          [],
          [wallet],
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual([])
    })
    it('removes nothing if empty array to remove', () => {
      expect(
        removeArrayFromArray(
          wallets,
          [],
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual(wallets)
    })
    it('removes the wallets (single) from an existing array', () => {
      expect(
        removeArrayFromArray(
          wallets,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          [wallets[0]!],
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual([wallets[1]])
    })
    it('removes the wallets (multiple) from an existing array', () => {
      expect(
        removeArrayFromArray(
          wallets,
          wallets,
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual([])
    })
    it('removes nothing if the wallet is not in the array', () => {
      expect(
        removeArrayFromArray(
          wallets,
          [wallet],
          (source) => (target) => source.address === target.address && source.chainId === target.chainId
        )
      ).toEqual(wallets)
    })
  })
})
