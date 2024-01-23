import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'
import { offerSnapshotMock } from '@echo/firestore-mocks/offer/offer-snapshot-mock'
import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { pastDate } from '@echo/utils/helpers/past-date'
import { describe, expect, it } from '@jest/globals'
import { assoc, pipe } from 'ramda'

describe('converters - offerDataConverter', () => {
  const document = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  const snapshot = offerSnapshotMock.LyCfl6Eg7JKuD7XJ6IPi!
  const documentData = offerDocumentDataMock.LyCfl6Eg7JKuD7XJ6IPi

  it('from Firestore conversion', () => {
    expect(offerDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion - expired', () => {
    const expiredAt = pastDate()
    const expiredSnapshot = assoc(
      'data',
      () => pipe(assoc('state', OFFER_STATE_OPEN), assoc('expiresAt', expiredAt))(documentData),
      snapshot
    )
    const expiredDocument = pipe(
      assoc('expiresAt', expiredAt),
      assoc('state', OFFER_STATE_EXPIRED),
      assoc('readOnly', true)
    )(document)
    expect(offerDataConverter.fromFirestore(expiredSnapshot)).toStrictEqual(expiredDocument)
  })

  it('from Firestore conversion - expired but in final state', () => {
    const expiredAt = pastDate()
    const expiredSnapshot = assoc(
      'data',
      () => pipe(assoc('state', OFFER_STATE_COMPLETED), assoc('expiresAt', expiredAt))(documentData),
      snapshot
    )
    const expiredDocument = pipe(
      assoc('expiresAt', expiredAt),
      assoc('state', OFFER_STATE_COMPLETED),
      assoc('readOnly', true)
    )(document)
    expect(offerDataConverter.fromFirestore(expiredSnapshot)).toStrictEqual(expiredDocument)
  })

  it('from Firestore conversion - read only', () => {
    expect(
      offerDataConverter.fromFirestore(assoc('data', () => assoc('state', OFFER_STATE_OPEN, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', OFFER_STATE_OPEN), assoc('readOnly', false))(document))
    expect(
      offerDataConverter.fromFirestore(
        assoc('data', () => assoc('state', OFFER_STATE_ACCEPTED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', OFFER_STATE_ACCEPTED), assoc('readOnly', false))(document))
    expect(
      offerDataConverter.fromFirestore(
        assoc('data', () => assoc('state', OFFER_STATE_CANCELLED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', OFFER_STATE_CANCELLED), assoc('readOnly', true))(document))
    expect(
      offerDataConverter.fromFirestore(
        assoc('data', () => assoc('state', OFFER_STATE_REJECTED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', OFFER_STATE_REJECTED), assoc('readOnly', true))(document))
    expect(
      offerDataConverter.fromFirestore(
        assoc('data', () => assoc('state', OFFER_STATE_COMPLETED, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', OFFER_STATE_COMPLETED), assoc('readOnly', true))(document))
    expect(
      offerDataConverter.fromFirestore(assoc('data', () => assoc('state', OFFER_STATE_EXPIRED, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', OFFER_STATE_EXPIRED), assoc('readOnly', true))(document))
  })

  it('to Firestore conversion', () => {
    expect(offerDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
