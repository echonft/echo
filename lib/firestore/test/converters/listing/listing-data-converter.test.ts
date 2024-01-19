import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { listingDocumentDataMock } from '@echo/firestore-mocks/listing/listing-document-data-mock'
import { listingSnapshotMock } from '@echo/firestore-mocks/listing/listing-snapshot-mock'
import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { getListingMockById } from '@echo/model-mocks/listing/get-listing-mock-by-id'
import { pastDate } from '@echo/utils/helpers/past-date'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('converters - listingDataConverter', () => {
  const document = getListingMockById('jUzMtPGKM62mMhEcmbN4')
  const snapshot = listingSnapshotMock.jUzMtPGKM62mMhEcmbN4!
  const documentData = listingDocumentDataMock.jUzMtPGKM62mMhEcmbN4

  it('from Firestore conversion', () => {
    expect(listingDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion - expired', () => {
    const expiredAt = pastDate()
    const expiredSnapshot = assoc('data', () => assoc('expiresAt', expiredAt, documentData), snapshot)
    const expiredDocument = pipe(
      assoc('expiresAt', expiredAt),
      assoc('state', LISTING_STATE_EXPIRED),
      assoc('readOnly', true)
    )(document)
    expect(listingDataConverter.fromFirestore(expiredSnapshot)).toStrictEqual(expiredDocument)
  })

  it('from Firestore conversion - read only', () => {
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', LISTING_STATE_OPEN, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', LISTING_STATE_OPEN), assoc('readOnly', false))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', LISTING_STATE_OFFERS_PENDING, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', LISTING_STATE_OFFERS_PENDING), assoc('readOnly', false))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', LISTING_STATE_PARTIALLY_FULFILLED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', LISTING_STATE_PARTIALLY_FULFILLED), assoc('readOnly', false))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', LISTING_STATE_FULFILLED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', LISTING_STATE_FULFILLED), assoc('readOnly', true))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', LISTING_STATE_CANCELLED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', LISTING_STATE_CANCELLED), assoc('readOnly', true))(document))
    expect(
      listingDataConverter.fromFirestore(
        assoc('data', () => assoc('state', LISTING_STATE_EXPIRED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', LISTING_STATE_EXPIRED), assoc('readOnly', true))(document))
  })

  it('to Firestore conversion', () => {
    expect(listingDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
