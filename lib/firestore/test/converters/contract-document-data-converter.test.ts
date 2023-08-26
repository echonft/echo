import { contractDocumentDataConverter } from '../../src/converters/contract-document-data-converter'
import { getNftCollectionMockById } from '../mocks/get-nft-collection-mock-by-id'
import { nftCollectionDocumentDataMock } from '../mocks/nft-collection-document-data-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  it('from Firestore conversion', () => {
    const nftCollectionDocumentData = nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!
    const nftCollection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const contract = nftCollection.contract
    const contractDocumentData = nftCollectionDocumentData.contract
    expect(contractDocumentDataConverter.fromFirestore(contract)).toStrictEqual(contractDocumentData)
  })

  it('to Firestore conversion', () => {
    const nftCollectionDocumentData = nftCollectionDocumentDataMock['Rc8pLQXxgyQGIRL0fr13']!
    const nftCollection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
    const contract = nftCollection.contract
    const contractDocumentData = nftCollectionDocumentData.contract
    expect(contractDocumentDataConverter.toFirestore(contractDocumentData)).toStrictEqual(contract)
  })
})
