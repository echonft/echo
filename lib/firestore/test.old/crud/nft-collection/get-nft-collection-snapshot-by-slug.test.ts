import { getNftCollectionSnapshotBySlug } from '../../../src/crud/nft-collection/get-nft-collection-snapshot-by-slug'
import { nftCollectionFirestoreData } from '../../mocks/nft-collection/nft-collection-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft-collection - getNftCollectionSnapshotBySlug', () => {
  it('wrong slug returns error', async () => {
    try {
      await getNftCollectionSnapshotBySlug('not-found')
    } catch (error) {
      expect(error).toMatch('nft collection not found')
    }
  })
  it('right slug returns proper nft collection', async () => {
    const nftCollectionSnapshot = await getNftCollectionSnapshotBySlug('pxmythics-genesis')
    expect(nftCollectionSnapshot.ref.path).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!.refPath)
  })
})
