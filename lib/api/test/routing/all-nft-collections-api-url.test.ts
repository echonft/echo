import { allNftCollectionsApiUrl } from '@echo-api/routing/all-nft-collections-api-url'
import { describe, expect, test } from '@jest/globals'

describe('routing - allNftCollectionApiUrl', () => {
  test('returns proper URL', () => {
    expect(allNftCollectionsApiUrl()).toStrictEqual(new URL('https://test.com/collections'))
  })
})
