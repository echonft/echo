import { listingPostDataConverter } from '@echo/firestore/converters/listing-post/listing-post-data-converter'
import { getListingPostDocumentDataMockById } from '@echo/firestore-mocks/listing-post/get-listing-post-document-data-mock-by-id'
import { getListingPostMockById } from '@echo/firestore-mocks/listing-post/get-listing-post-mock-by-id'
import { listingPostSnapshotMock } from '@echo/firestore-mocks/listing-post/listing-post-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - listingPostDataConverter', () => {
  const id = 'jXadAgs0rtUXZWfG9t0z'
  const mock = getListingPostMockById(id)

  it('from Firestore conversion', () => {
    const snapshot = listingPostSnapshotMock[id]!
    expect(listingPostDataConverter.fromFirestore(snapshot)).toStrictEqual(mock)
  })

  it('to Firestore conversion', () => {
    const documentData = getListingPostDocumentDataMockById(id)
    expect(listingPostDataConverter.toFirestore(mock)).toStrictEqual(documentData)
  })
})
