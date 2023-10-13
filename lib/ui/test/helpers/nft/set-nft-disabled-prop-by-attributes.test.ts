import type { Nft } from '@echo/model/types/nft'
import { setNftDisabledPropFromTraitFilters } from '@echo/ui/helpers/nft/set-nft-disabled-prop-from-trait-filters'
import { TraitFilter } from '@echo/ui/types/trait-filter'
import { describe, expect, it } from '@jest/globals'
import { assoc, map } from 'ramda'

describe('helpers - nft - setNftDisabledPropFromTraitFilters', () => {
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

  it('filters correctly', () => {
    const filters: TraitFilter[] = [
      { trait: 'Algorithm', value: 'archimedean', count: 1, selected: true },
      { trait: 'Algorithm', value: 'hyperbolic', count: 1, selected: true }
    ]
    const result = map(setNftDisabledPropFromTraitFilters(filters), nfts)
    expect(result).toStrictEqual([nft1, nft2, assoc('disabled', true, nft3)])
  })

  it('filters correctly part 2', () => {
    const filters: TraitFilter[] = [
      { trait: 'Algorithm', value: 'archimedean', count: 1, selected: true },
      { trait: 'Algorithm', value: 'hyperbolic', count: 1, selected: true },
      { trait: 'Speed', value: '5', count: 1, selected: true }
    ]
    const result = map(setNftDisabledPropFromTraitFilters(filters), nfts)
    expect(result).toStrictEqual([nft1, nft2, nft3])
  })

  it('filters correctly part 3', () => {
    const filters: TraitFilter[] = [{ trait: 'Speed', value: '5', count: 1 }]
    const result = map(setNftDisabledPropFromTraitFilters(filters), nfts)
    expect(result).toStrictEqual([nft1, nft2, nft3])
  })

  it('filters correctly part 4', () => {
    const filters: TraitFilter[] = [{ trait: 'Ring', value: 'main', count: 1, selected: true }]
    const result = map(setNftDisabledPropFromTraitFilters(filters), nfts)
    expect(result).toStrictEqual([nft1, nft2, assoc('disabled', true, nft3)])
  })

  it('filters correctly part 5', () => {
    const filters: TraitFilter[] = [{ trait: 'Ring', value: 'none', count: 1, selected: true }]
    const result = map(setNftDisabledPropFromTraitFilters(filters), nfts)
    expect(result).toEqual([
      assoc('disabled', true, nft1),
      assoc('disabled', true, nft2),
      assoc('disabled', true, nft3)
    ])
  })
})
