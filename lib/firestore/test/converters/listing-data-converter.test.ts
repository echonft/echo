import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { listingDocumentDataMock } from '@echo/firestore/mocks/listing/listing-document-data-mock'
import { listingSnapshotMock } from '@echo/firestore/mocks/listing/listing-snapshot-mock'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import { listingSignature } from '@echo/model/helpers/listing/listing-signature'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { assoc, pipe, prop } from 'ramda'

describe('converters - listingDataConverter', () => {
  const id = listingMockId()
  const document = getListingMockById(id)
  const snapshot = pipe(listingSnapshotMock, prop(id))() as unknown as QueryDocumentSnapshot<
    ListingDocumentData,
    ListingDocumentData
  >
  const documentData = pipe(listingDocumentDataMock, prop(id))()

  it('from Firestore conversion', () => {
    expect(listingDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    const signature = listingSignature(document)
    expect(listingDataConverter.toFirestore(assoc('signature', signature, document))).toStrictEqual(documentData)
  })
})
