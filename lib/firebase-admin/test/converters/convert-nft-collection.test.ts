import { nftCollectionFirestoreData } from '../../../mocks/src/nft-collection/nft-collection-firestore-data'
import { getFirestoreNftCollection } from '../../src/data/nft-collection/get-firestore-nft-collection'
import { describe, expect, it } from '@jest/globals'

describe('convertNftCollection', () => {
  it('correct conversion', async () => {
    const nftCollection = await getFirestoreNftCollection('Rc8pLQXxgyQGIRL0fr13')
    expect(nftCollection).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13'])
  })
})
