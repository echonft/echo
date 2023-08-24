import { nftCollectionDataConverter } from '../../src/converters/nft-collection-data-converter'
import { nftCollectionDocumentDataMock } from '../mocks/nft-collection-document-data-mock'
import { nftCollectionMock } from '../mocks/nft-collection-mock'
import { nftCollectionSnapshotMock } from '../mocks/nft-collection-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - nftCollectionDataConverter', () => {
  it('from Firestore conversion', () => {
    const nftCollectionSnapshot = nftCollectionSnapshotMock['Rc8pLQXxgyQGIRL0fr13']!
    const nftCollection = nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']
    expect(nftCollectionDataConverter.fromFirestore(nftCollectionSnapshot)).toStrictEqual(nftCollection)
  })

  it('to Firestore conversion', () => {
    const nftCollection = nftCollectionMock['Rc8pLQXxgyQGIRL0fr13']!
    const nftCollectionDocumentData = nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!
    expect(nftCollectionDataConverter.toFirestore(nftCollection)).toStrictEqual(nftCollectionDocumentData)
  })
})
