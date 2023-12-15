import { getCollectionMockById } from '@echo/model-mocks/collection/get-collection-mock-by-id'
import { getAllNftMocks } from '@echo/model-mocks/nft/get-all-nft-mocks'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group-nfts-by-collection'
import { describe, expect, test } from '@jest/globals'

describe('helpers - nft - groupNftsByCollection', () => {
  test('group NFTs by collection', () => {
    const groups = groupNftsByCollection(getAllNftMocks())
    expect(groups.length).toBe(2)
    for (const group of groups) {
      const collection = getCollectionMockById(group.id)
      for (const item of group.items) {
        expect(item.collection).toStrictEqual(collection)
      }
    }
  })
})
