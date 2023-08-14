import { getTraitsForNfts } from '../../../src/helpers/nft/get-traits-for-nfts'
import { Nft } from '../../../src/types/nft'
import { describe, expect, test } from '@jest/globals'

describe('getTraitsForNfts', () => {
  test('returns the right traits for a set of nfts', () => {
    const nft1: Nft = {
      attributes: [
        { trait: 'traitB', value: '1' },
        { trait: 'traitA', value: '2' }
      ]
    } as unknown as Nft
    const nft2 = {
      attributes: [
        { trait: 'traitA', value: '1' },
        { trait: 'traitB', value: '1' }
      ]
    } as unknown as Nft
    const nft3 = { attributes: [{ trait: 'traitC', value: '1' }] } as unknown as Nft
    expect(getTraitsForNfts([nft1, nft2, nft3])).toEqual({
      traitA: [
        { value: '1', count: 1 },
        { value: '2', count: 1 }
      ],
      traitB: [{ value: '1', count: 2 }],
      traitC: [{ value: '1', count: 1 }]
    })
  })
})
