import { contractDocumentDataConverter } from '@echo/firestore/converters/contract-document-data-converter'
import { getNftCollectionDocumentDataMockById } from '@echo/firestore-mocks/get-nft-collection-document-data-mock-by-id'
import { getNftCollectionMockById } from '@echo/firestore-mocks/get-nft-collection-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  const nftCollectionDocumentData = getNftCollectionDocumentDataMockById('Rc8pLQXxgyQGIRL0fr13')!
  const nftCollection = getNftCollectionMockById('Rc8pLQXxgyQGIRL0fr13')
  const contractDocumentData = nftCollectionDocumentData.contract
  const contract = nftCollection.contract

  it('from Firestore conversion', () => {
    expect(contractDocumentDataConverter.fromFirestore(contractDocumentData)).toStrictEqual(contract)
  })

  it('to Firestore conversion', () => {
    expect(contractDocumentDataConverter.toFirestore(contract)).toStrictEqual(contractDocumentData)
  })
})
