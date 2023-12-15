import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'
import { listingSnapshotMock } from '@echo/firestore-mocks/listing/listing-snapshot-mock'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - listingDataConverter', () => {
  const document = getListingMockById('jUzMtPGKM62mMhEcmbN4')

  it('from Firestore conversion', () => {
    const snapshot = listingSnapshotMock.jUzMtPGKM62mMhEcmbN4!
    expect(listingDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    const documentData = listingDocumentDataMock.jUzMtPGKM62mMhEcmbN4
    expect(listingDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
