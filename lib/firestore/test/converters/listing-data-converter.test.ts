import { listingDataConverter } from '../../src/converters/listing-data-converter'
import { getListingMockById } from '../mocks/get-listing-mock-by-id'
import { listingDocumentDataMock } from '../mocks/listing-document-data-mock'
import { listingSnapshotMock } from '../mocks/listing-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - listingDataConverter', () => {
  it('from Firestore conversion', () => {
    const listingSnapshot = listingSnapshotMock['jUzMtPGKM62mMhEcmbN4']!
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    expect(listingDataConverter.fromFirestore(listingSnapshot)).toStrictEqual(listing)
  })

  it('to Firestore conversion', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const listingDocumentData = listingDocumentDataMock['jUzMtPGKM62mMhEcmbN4']
    expect(listingDataConverter.toFirestore(listing)).toStrictEqual(listingDocumentData)
  })
})
