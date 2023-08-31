import { mapNftTraitsToNftAttributes } from '../../src/mappers/map-nft-traits-to-nft-attributes'
import { NftTraits } from '../../src/types/nft-traits'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftTraitsToNftAttributes', () => {
  it('maps correctly', () => {
    const traits: NftTraits = {
      'Trait 1': [
        { value: 'Trait Name A', count: 123 },
        { value: 'Trait Name B', count: 456 },
        { value: 'Trait Name C', count: 789 },
        { value: 'Trait Name D', count: 111 }
      ],
      'Trait 2': [
        { value: 'Trait Name A', count: 1111 },
        { value: 'Trait Name B', count: 2222 },
        { value: 'Trait Name C', count: 3333 },
        { value: 'Trait Name D', count: 4444 }
      ],
      'Trait 3': [
        { value: 'Trait Name A', count: 10 },
        { value: 'Trait Name B', count: 100 },
        { value: 'Trait Name C', count: 1000 }
      ]
    }
    expect(mapNftTraitsToNftAttributes(traits)).toStrictEqual([
      { trait: 'Trait 1', value: 'Trait Name A' },
      { trait: 'Trait 1', value: 'Trait Name B' },
      { trait: 'Trait 1', value: 'Trait Name C' },
      { trait: 'Trait 1', value: 'Trait Name D' },
      { trait: 'Trait 2', value: 'Trait Name A' },
      { trait: 'Trait 2', value: 'Trait Name B' },
      { trait: 'Trait 2', value: 'Trait Name C' },
      { trait: 'Trait 2', value: 'Trait Name D' },
      { trait: 'Trait 3', value: 'Trait Name A' },
      { trait: 'Trait 3', value: 'Trait Name B' },
      { trait: 'Trait 3', value: 'Trait Name C' }
    ])
  })
})
