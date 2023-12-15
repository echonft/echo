import { offerDataConverter } from '@echo/firestore/converters/offer/offer-data-converter'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'
import { offerSnapshotMock } from '@echo/firestore-mocks/offer/offer-snapshot-mock'
import { getOfferMockById } from '@echo/model-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - offerDataConverter', () => {
  const document = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')

  it('from Firestore conversion', () => {
    const snapshot = offerSnapshotMock.LyCfl6Eg7JKuD7XJ6IPi!
    expect(offerDataConverter.fromFirestore(snapshot)).toStrictEqual(document)
  })

  it('to Firestore conversion', () => {
    const documentData = offerDocumentDataMock.LyCfl6Eg7JKuD7XJ6IPi
    expect(offerDataConverter.toFirestore(document)).toStrictEqual(documentData)
  })
})
