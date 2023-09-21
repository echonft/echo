import { offerDataConverter } from '@echo/firestore/converters/offer-data-converter'
import { offerDocumentDataMock } from '@echo/firestore-mocks/offer/offer-document-data-mock'
import { offerMock } from '@echo/firestore-mocks/offer/offer-mock'
import { offerSnapshotMock } from '@echo/firestore-mocks/offer/offer-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - offerDataConverter', () => {
  it('from Firestore conversion', () => {
    const offerSnapshot = offerSnapshotMock['LyCfl6Eg7JKuD7XJ6IPi']!
    const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']
    expect(offerDataConverter.fromFirestore(offerSnapshot)).toStrictEqual(offer)
  })

  it('to Firestore conversion', () => {
    const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
    const offerDocumentData = offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']
    expect(offerDataConverter.toFirestore(offer)).toStrictEqual(offerDocumentData)
  })
})
