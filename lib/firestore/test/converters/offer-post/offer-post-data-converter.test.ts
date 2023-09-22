import { offerPostDataConverter } from '@echo/firestore/converters/offer-post/offer-post-data-converter'
import { getOfferPostDocumentDataMockById } from '@echo/firestore-mocks/offer-post/get-offer-post-document-data-mock-by-id'
import { getOfferPostMockById } from '@echo/firestore-mocks/offer-post/get-offer-post-mock-by-id'
import { offerPostSnapshotMock } from '@echo/firestore-mocks/offer-post/offer-post-snapshot-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - offerPostDataConverter', () => {
  const id = 'hot4VWDzd6ZRsC3nsvnb'
  const mock = getOfferPostMockById(id)

  it('from Firestore conversion', () => {
    const snapshot = offerPostSnapshotMock[id]!
    expect(offerPostDataConverter.fromFirestore(snapshot)).toStrictEqual(mock)
  })

  it('to Firestore conversion', () => {
    const documentData = getOfferPostDocumentDataMockById(id)
    expect(offerPostDataConverter.toFirestore(mock)).toStrictEqual(documentData)
  })
})
