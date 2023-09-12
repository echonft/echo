import { eqPaths } from '@echo-utils/fp/eq-paths'
import { describe, expect, it } from '@jest/globals'

describe('fp - eqPaths', () => {
  it('returns false if paths are not equal in both object', () => {
    const objA = {
      nft: {
        collection: {
          id: 'idA'
        }
      }
    }
    const objB = {
      nft: {
        collection: {
          id: 'idB'
        }
      }
    }
    expect(eqPaths(['nft', 'collection', 'id'])(objA, objB)).toBeFalsy()
  })
  it('returns true if paths are equal in both object', () => {
    const objA = {
      nft: {
        collection: {
          id: 'id'
        }
      }
    }
    const objB = {
      nft: {
        collection: {
          id: 'id'
        }
      }
    }
    expect(eqPaths(['nft', 'collection', 'id'])(objA, objB)).toBeTruthy()
  })
})
