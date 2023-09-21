import { listingTargetDocumentDataConverter } from '@echo/firestore/converters/listing-target-document-data-converter'
import { getListingDocumentDataMockById } from '@echo/firestore-mocks/listing/get-listing-document-data-mock-by-id'
import { getListingMockById } from '@echo/firestore-mocks/listing/get-listing-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - listingTargetDocumentDataConverter', () => {
  const listingDocumentData = getListingDocumentDataMockById('jUzMtPGKM62mMhEcmbN4')
  const listing = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  const listingTargetDocumentData = listingDocumentData.targets[0]
  const listingTarget = listing.targets[0]

  it('from Firestore conversion', () => {
    expect(listingTargetDocumentDataConverter.fromFirestore(listingTargetDocumentData)).toStrictEqual(listingTarget)
  })

  it('to Firestore conversion', () => {
    expect(listingTargetDocumentDataConverter.toFirestore(listingTarget)).toStrictEqual(listingTargetDocumentData)
  })
})
