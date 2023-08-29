import { filterNftsByTraits } from '../../src/helpers/filter-nfts-by-traits'
import { Nft } from '../../src/types/nft'
import { NftTraits } from '../../src/types/nft-traits'
import { describe, expect, it } from '@jest/globals'

describe('helpers - filterNftsByTraits', () => {
  const nft1 = {
    id: '8hHFadIrrooORfTOLkBg',
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' },
      { value: 'cumulus', trait: 'Density' },
      { value: '0001', trait: 'Colors' },
      { value: 'random1', trait: 'Palette' },
      { value: '#complement', trait: 'Background' }
    ]
  } as Nft
  const nft2 = {
    id: 'iRZFKEujarikVjpiFAkE',
    attributes: [
      {
        value: 'hyperbolic',
        trait: 'Algorithm'
      },
      {
        value: 'main',
        trait: 'Ring'
      },
      {
        value: 'short',
        trait: 'Animation'
      },
      {
        value: '5',
        trait: 'Speed'
      },
      {
        value: 'cumulus',
        trait: 'Density'
      },
      {
        value: '0001',
        trait: 'Colors'
      },
      {
        value: 'random1',
        trait: 'Palette'
      },
      {
        value: '#complement',
        trait: 'Background'
      }
    ]
  } as Nft
  const nft3 = {
    id: '5SeF1NSN5uPUxtWSr516',
    attributes: [
      {
        value: 'fermat',
        trait: 'Algorithm'
      },
      {
        value: 'halo',
        trait: 'Ring'
      },
      {
        value: 'opera',
        trait: 'Animation'
      },
      {
        value: '5',
        trait: 'Speed'
      },
      {
        value: 'cumulus',
        trait: 'Density'
      },
      {
        value: '0011',
        trait: 'Colors'
      },
      {
        value: 'pasture3',
        trait: 'Palette'
      },
      {
        value: '#777777',
        trait: 'Background'
      }
    ]
  } as Nft
  const nfts = [nft1, nft2, nft3]

  it('returns all the nfts if no traits are provided', () => {
    expect(filterNftsByTraits(nfts, undefined)).toStrictEqual(nfts)
  })

  it('filters correctly', () => {
    const traits: NftTraits = {
      Algorithm: [
        { value: 'archimedean', count: 1 },
        { value: 'hyperbolic', count: 1 }
      ]
    }
    const filteredNfts = filterNftsByTraits(nfts, traits)
    expect(filteredNfts.length).toBe(2)
    expect(filteredNfts).toStrictEqual([nft1, nft2])
  })

  it('filters correctly part 2', () => {
    const traits: NftTraits = {
      Algorithm: [
        { value: 'archimedean', count: 1 },
        { value: 'hyperbolic', count: 1 }
      ],
      Speed: [{ value: '5', count: 1 }]
    }
    const filteredNfts = filterNftsByTraits(nfts, traits)
    expect(filteredNfts.length).toBe(2)
    expect(filteredNfts).toStrictEqual([nft1, nft2])
  })

  it('filters correctly part 3', () => {
    const traits: NftTraits = {
      Speed: [{ value: '5', count: 1 }]
    }
    const filteredNfts = filterNftsByTraits(nfts, traits)
    expect(filteredNfts.length).toBe(3)
    expect(filteredNfts).toStrictEqual([nft1, nft2, nft3])
  })

  it('filters correctly part 4', () => {
    const traits: NftTraits = {
      Ring: [{ value: 'main', count: 1 }],
      Speed: [{ value: '5', count: 1 }],
      Density: [{ value: 'cumulus', count: 1 }],
      Animation: [{ value: 'movie', count: 1 }]
    }
    const filteredNfts = filterNftsByTraits(nfts, traits)
    expect(filteredNfts.length).toBe(1)
    expect(filteredNfts).toStrictEqual([nft1])
  })

  it('filters correctly part 5', () => {
    const traits: NftTraits = {
      Ring: [{ value: 'main', count: 1 }],
      Speed: [{ value: '5', count: 1 }],
      Density: [{ value: 'cumulus', count: 1 }],
      Animation: [{ value: 'opera', count: 1 }]
    }
    expect(filterNftsByTraits(nfts, traits)).toEqual([])
  })
})
