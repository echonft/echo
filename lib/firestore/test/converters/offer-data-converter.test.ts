import { offerDataConverter } from '../../src/converters/offer-data-converter'
import { offerDocumentDataMock } from '../mocks/offer-document-data-mock'
import { offerMock } from '../mocks/offer-mock'
import { offerSnapshotMock } from '../mocks/offer-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('offerDataConverter', () => {
  it('from Firestore conversion', () => {
    const offerSnapshot = offerSnapshotMock['LyCfl6Eg7JKuD7XJ6IPi']!
    const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']
    expect(offerDataConverter.fromFirestore(offerSnapshot)).toEqual(offer)
  })

  it('to Firestore conversion', () => {
    const offer = offerMock['LyCfl6Eg7JKuD7XJ6IPi']!
    const offerDocumentData = offerDocumentDataMock['LyCfl6Eg7JKuD7XJ6IPi']
    expect(offerDataConverter.toFirestore(offer)).toEqual(offerDocumentData)
  })
})
