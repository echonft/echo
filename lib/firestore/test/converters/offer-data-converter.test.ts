import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { offerDocumentDataMock } from '@echo/firestore/mocks/offer/offer-document-data-mock'
import { offerSnapshotMock } from '@echo/firestore/mocks/offer/offer-snapshot-mock'
import { OfferState } from '@echo/model/constants/offer-state'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import type { Offer } from '@echo/model/types/offer/offer'
import { describe, expect, it } from '@jest/globals'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { assoc, pipe, toUpper } from 'ramda'

describe('converters - offerDataConverter', () => {
  const document = getOfferMockById(offerMockToJohnnycageId())
  const snapshot = offerSnapshotMock().LyCfl6Eg7JKuD7XJ6IPi!
  const documentData = offerDocumentDataMock().LyCfl6Eg7JKuD7XJ6IPi

  it('from Firestore conversion', () => {
    expect(offerDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('from Firestore conversion - read only', () => {
    expect(
      offerDataConverter.fromFirestore(assoc('data', () => assoc('state', OfferState.Open, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', OfferState.Open), assoc('readOnly', false))(document))
    expect(
      offerDataConverter.fromFirestore(assoc('data', () => assoc('state', OfferState.Accepted, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', OfferState.Accepted), assoc('readOnly', false))(document))
    expect(
      offerDataConverter.fromFirestore(
        assoc('data', () => assoc('state', OfferState.Cancelled, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', OfferState.Cancelled), assoc('readOnly', true))(document))
    expect(
      offerDataConverter.fromFirestore(assoc('data', () => assoc('state', OfferState.Rejected, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', OfferState.Rejected), assoc('readOnly', true))(document))
    expect(
      offerDataConverter.fromFirestore(
        assoc('data', () => assoc('state', OfferState.Completed, documentData), snapshot)
      )
    ).toStrictEqual(pipe(assoc('state', OfferState.Completed), assoc('readOnly', true))(document))
    expect(
      offerDataConverter.fromFirestore(assoc('data', () => assoc('state', OfferState.Expired, documentData), snapshot))
    ).toStrictEqual(pipe(assoc('state', OfferState.Expired), assoc('readOnly', true))(document))
  })

  it('to Firestore conversion', () => {
    expect(
      offerDataConverter.toFirestore(
        assoc('idContract', toUpper(document.idContract), document) as unknown as WithFieldValue<Offer>
      )
    ).toStrictEqual(documentData)
  })
})
