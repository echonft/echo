import { getFirestoreNftCollection } from '../../data/nft-collection/get-firestore-nft-collection'
import { nftCollectionData } from '../../utils/test/mocks/nft-collection/nft-collection-data'
import { describe, expect, it } from '@jest/globals'

describe('convertNftCollection', () => {
  it('correct conversion', async () => {
    const nftCollection = await getFirestoreNftCollection('Rc8pLQXxgyQGIRL0fr13')
    expect(nftCollection).toEqual(nftCollectionData['Rc8pLQXxgyQGIRL0fr13'])
  })
})
