import { offerItemDocumentDataConverter } from '@echo/firestore/converters/offer/offer-item-document-data-converter'
import { getOfferDocumentDataMockById } from '@echo/firestore-mocks/offer/get-offer-document-data-mock-by-id'
import { getOfferMockById } from '@echo/firestore-mocks/offer/get-offer-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  const offerDocumentData = getOfferDocumentDataMockById('LyCfl6Eg7JKuD7XJ6IPi')
  const offer = getOfferMockById('LyCfl6Eg7JKuD7XJ6IPi')
  const offerItemDocumentData = offerDocumentData.senderItems[0]
  const offerItem = offer.senderItems[0]

  it('from Firestore conversion', () => {
    expect(offerItemDocumentDataConverter.fromFirestore(offerItemDocumentData)).toStrictEqual(offerItem)
  })

  it('to Firestore conversion', () => {
    expect(offerItemDocumentDataConverter.toFirestore(offerItem)).toStrictEqual(offerItemDocumentData)
  })
})
