import { NftTraits } from '../../dist'
import { groupNftTraits } from '../../src'
import { describe, expect, it } from '@jest/globals'

describe('helpers - groupNftTraits', () => {
  it('groups traits correctly', () => {
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
    expect(groupNftTraits(traits)).toStrictEqual([
      {
        trait: 'Trait 1',
        values: [
          { value: 'Trait Name A', count: 123 },
          { value: 'Trait Name B', count: 456 },
          { value: 'Trait Name C', count: 789 },
          { value: 'Trait Name D', count: 111 }
        ]
      },
      {
        trait: 'Trait 2',
        values: [
          { value: 'Trait Name A', count: 1111 },
          { value: 'Trait Name B', count: 2222 },
          { value: 'Trait Name C', count: 3333 },
          { value: 'Trait Name D', count: 4444 }
        ]
      },
      {
        trait: 'Trait 3',
        values: [
          { value: 'Trait Name A', count: 10 },
          { value: 'Trait Name B', count: 100 },
          { value: 'Trait Name C', count: 1000 }
        ]
      }
    ])
  })
})
