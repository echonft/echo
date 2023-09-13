import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { getListingDocumentDataMockById } from '@echo/firestore-mocks/get-listing-document-data-mock-by-id'
import { getListingMockById } from '@echo/firestore-mocks/get-listing-mock-by-id'
import { listingSnapshotMock } from '@echo/firestore-mocks/listing-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - listingDataConverter', () => {
  it('from Firestore conversion', () => {
    const listingSnapshot = listingSnapshotMock['jUzMtPGKM62mMhEcmbN4']!
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    expect(listingDataConverter.fromFirestore(listingSnapshot)).toStrictEqual(listing)
  })

  it('to Firestore conversion', () => {
    const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
    const listingDocumentData = getListingDocumentDataMockById('jUzMtPGKM62mMhEcmbN4')
    expect(listingDataConverter.toFirestore(listing)).toStrictEqual(listingDocumentData)
  })
})
