import { allNftCollectionApiUrl } from '../../src/routing/all-nft-collection-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - allNftCollectionApiUrl', () => {
  test('returns proper URL', () => {
    expect(allNftCollectionApiUrl()).toStrictEqual(new URL('https://test.com/collection/all'))
  })
})
