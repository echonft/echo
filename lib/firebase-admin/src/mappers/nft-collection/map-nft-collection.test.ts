import { nftCollections } from '../../utils/test/mocks/nft-collection/nft-collection'
import { nftCollectionData } from '../../utils/test/mocks/nft-collection/nft-collection-data'
import { mapNftCollection } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapNftCollection', () => {
  it('correct mapping', async () => {
    const nftCollection = await mapNftCollection(Promise.resolve(nftCollectionData['Rc8pLQXxgyQGIRL0fr13']!))
    expect(nftCollection).toEqual(nftCollections['Rc8pLQXxgyQGIRL0fr13'])
  })
})
