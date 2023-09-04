import { embedValueForTarget } from '../../../src/helpers/embed/embed-value-for-target'
import { ListingTarget } from '@echo/firestore-types'
import { describe, expect, it } from '@jest/globals'

describe('utils - embed - embedValueForTarget', () => {
  it('should return expected result with name', () => {
    const target = {
      collection: {
        name: 'Test Token'
      }
    } as unknown as ListingTarget
    const expectedResult = 'Any NFT from Test Token'
    const result = embedValueForTarget(target)
    expect(result).toEqual(expectedResult)
  })
})
