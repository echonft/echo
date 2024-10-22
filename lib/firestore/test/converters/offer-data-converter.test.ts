import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { offerDocumentDataMock } from '@echo/firestore/mocks/offer/offer-document-data-mock'
import { offerSnapshotMock } from '@echo/firestore/mocks/offer/offer-snapshot-mock'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import { getOfferMockById } from '@echo/model/mocks/offer/get-offer-mock-by-id'
import { offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'
import { describe, expect, it } from '@jest/globals'
import type { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { pipe, prop } from 'ramda'

describe('converters - offerDataConverter', () => {
  const id = offerMockToJohnnycageId()
  const document = getOfferMockById(id)
  const snapshot = pipe(offerSnapshotMock, prop(id))() as unknown as QueryDocumentSnapshot<
    OfferDocumentData,
    OfferDocumentData
  >
  const documentData = pipe(offerDocumentDataMock, prop(id))()

  it('from Firestore conversion', () => {
    expect(offerDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    expect(offerDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
