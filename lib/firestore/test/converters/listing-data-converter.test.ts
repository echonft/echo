import { listingDataConverter } from '../../src/converters/listing-data-converter'
import { listingDocumentDataMock } from '../mocks/listing-document-data-mock'
import { listingMock } from '../mocks/listing-mock'
import { listingSnapshotMock } from '../mocks/listing-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('listingDataConverter', () => {
  it('from Firestore conversion', () => {
    const listingSnapshot = listingSnapshotMock['jUzMtPGKM62mMhEcmbN4']!
    const listing = listingMock['jUzMtPGKM62mMhEcmbN4']
    expect(listingDataConverter.fromFirestore(listingSnapshot)).toStrictEqual(listing)
  })

  it('to Firestore conversion', () => {
    const listing = listingMock['jUzMtPGKM62mMhEcmbN4']!
    const listingDocumentData = listingDocumentDataMock['jUzMtPGKM62mMhEcmbN4']
    expect(listingDataConverter.toFirestore(listing)).toStrictEqual(listingDocumentData)
  })
})
