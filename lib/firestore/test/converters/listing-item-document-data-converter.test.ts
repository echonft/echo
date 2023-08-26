import { listingItemDocumentDataConverter } from '../../src/converters/listing-item-document-data-converter'
import { getListingDocumentDataMockById } from '../mocks/get-listing-document-data-mock-by-id'
import { getListingMockById } from '../mocks/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  const listingDocumentData = getListingDocumentDataMockById('jUzMtPGKM62mMhEcmbN4')
  const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  const listingItemDocumentData = listingDocumentData.items[0]
  const listingItem = listing.items[0]

  it('from Firestore conversion', () => {
    expect(listingItemDocumentDataConverter.fromFirestore(listingItemDocumentData)).toStrictEqual(listingItem)
  })

  it('to Firestore conversion', () => {
    expect(listingItemDocumentDataConverter.toFirestore(listingItem)).toStrictEqual(listingItemDocumentData)
  })
})
