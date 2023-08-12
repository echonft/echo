import { getNftCollectionSnapshotByContractAddress } from '../../../src/crud/nft-collection/get-nft-collection-snapshot-by-contract-address'
import { nftCollectionFirestoreData } from '../../mocks/nft-collection/nft-collection-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - nft-collection - getNftCollectionSnapshotByContractAddress', () => {
  it('wrong address and chain id returns error', async () => {
    try {
      await getNftCollectionSnapshotByContractAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toMatch('contract not found')
    }
  })
  it('wrong address but right chain id returns error', async () => {
    try {
      await getNftCollectionSnapshotByContractAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toMatch('contract not found')
    }
  })
  it('wrong chain id but right address returns error', async () => {
    try {
      await getNftCollectionSnapshotByContractAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toMatch('contract not found')
    }
  })
  it('right query returns proper nft collection', async () => {
    const nftCollectionSnapshot = await getNftCollectionSnapshotByContractAddress({
      address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
      chainId: 1
    })
    expect(nftCollectionSnapshot.ref.path).toEqual(nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!.refPath)
  })
})
