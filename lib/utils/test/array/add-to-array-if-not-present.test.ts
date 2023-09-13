import { addToArrayIfNotPresent } from '@echo/utils/array/add-to-array-if-not-present'
import { describe, expect, it } from '@jest/globals'

describe('array - addToArrayIfNotPresent', () => {
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

  it('adds a wallet in an empty array', () => {
    expect(
      addToArrayIfNotPresent(
        [],
        wallet,
        (source) => (target) => source.address === target.address && source.chainId === target.chainId
      )
    ).toEqual([wallet])
  })
  it('adds a wallet in an array', () => {
    expect(
      addToArrayIfNotPresent(
        wallets,
        wallet,
        (source) => (target) => source.address === target.address && source.chainId === target.chainId
      )
    ).toEqual([wallet, ...wallets])
  })
  it('dont add a wallet that is already on the list', () => {
    expect(
      addToArrayIfNotPresent(
        wallets,
        wallets[0]!,
        (source) => (target) => source.address === target.address && source.chainId === target.chainId
      )
    ).toEqual(wallets)
  })
})
