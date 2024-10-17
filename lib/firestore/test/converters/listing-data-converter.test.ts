import { listingDataConverter } from '@echo/firestore/converters/listing-data-converter'
import { listingDocumentDataMock } from '@echo/firestore/mocks/listing/listing-document-data-mock'
import { listingSnapshotMock } from '@echo/firestore/mocks/listing/listing-snapshot-mock'
import { ListingState } from '@echo/model/constants/listing-state'
import { getListingMockById } from '@echo/model/mocks/listing/get-listing-mock-by-id'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('converters - listingDataConverter', () => {
  const document = getListingMockById(listingMockId())
  const snapshot = listingSnapshotMock().jUzMtPGKM62mMhEcmbN4!
  const documentData = listingDocumentDataMock().jUzMtPGKM62mMhEcmbN4

  it('from Firestore conversion', () => {
    expect(listingDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion - read only', () => {
    expect(
      listingDataConverter.fromFirestore(assoc('data', () => assoc('state', ListingState.Open, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', ListingState.Open), assoc('readOnly', false))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', ListingState.OffersPending, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', ListingState.OffersPending), assoc('readOnly', false))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', ListingState.PartiallyFulfilled, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', ListingState.PartiallyFulfilled), assoc('readOnly', true))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', ListingState.Fulfilled, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', ListingState.Fulfilled), assoc('readOnly', true))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', ListingState.Cancelled, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', ListingState.Cancelled), assoc('readOnly', true))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', ListingState.Expired, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', ListingState.Expired), assoc('readOnly', true))(document))
  })

  it('to Firestore conversion', () => {
    expect(listingDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
