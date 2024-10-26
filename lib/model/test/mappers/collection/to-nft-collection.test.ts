import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import type { NftCollection } from '@echo/model/types/nft'
import { describe, expect, test } from '@jest/globals'

describe('mappers - collection - toNftCollection', () => {
  const collection = collectionMockPx
  const expected: NftCollection = {
    contract: collectionMockPx.contract,
    name: collectionMockPx.name,
    slug: collectionMockPx.slug,
    totalSupply: collectionMockPx.totalSupply
  }
  test('maps correctly', () => {
    expect(toNftCollection(collection)).toStrictEqual(expected)
  })
})
