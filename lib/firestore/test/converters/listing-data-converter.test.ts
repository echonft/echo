import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { listingDocumentDataMock } from '@echo/firestore/mocks/listing/listing-document-data-mock'
import { listingSnapshotMock } from '@echo/firestore/mocks/listing/listing-snapshot-mock'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'
import { pipe, prop } from 'ramda'

describe('converters - listingDataConverter', () => {
  const id = listingMockId()
  const document = getListingMockById(id)
  const snapshot = pipe(listingSnapshotMock, prop(id))()
  const documentData = pipe(listingDocumentDataMock, prop(id))()

  it('from Firestore conversion', () => {
    expect(listingDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(listingDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
