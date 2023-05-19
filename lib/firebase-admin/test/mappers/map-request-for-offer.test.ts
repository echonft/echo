import { requestsForOffer } from '../../../mocks/src/request-for-offer/request-for-offer'
import { requestForOfferFirestoreData } from '../../../mocks/src/request-for-offer/request-for-offer-firestore-data'
import { mapRequestForOffer } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('mapRequestForOffer', () => {
  it('request for offer mapping', async () => {
    const expected = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
    const requestForOffer = await mapRequestForOffer(
      Promise.resolve(requestForOfferFirestoreData['jUzMtPGKM62mMhEcmbN4']!)
    )
    expect(omit(['offers', 'swaps', 'items'], requestForOffer)).toStrictEqual(
      omit(['offers', 'swaps', 'items'], expected)
    )
    requestForOffer.items.forEach((item, index) => {
      expect(item.id).toStrictEqual(expected.items[index]!.id)
    })
    requestForOffer.offers?.forEach((offer, index) => {
      const expectedOffer = expected.offers?.[index]
      expect(omit(['senderItems', 'receiverItems'], offer)).toStrictEqual(
        omit(['senderItems', 'receiverItems'], expectedOffer)
      )
      offer.senderItems.forEach((item, index) => {
        expect(item.id).toStrictEqual(expectedOffer?.senderItems[index]!.id)
      })
      offer.receiverItems.forEach((item, index) => {
        expect(item.id).toStrictEqual(expectedOffer?.senderItems[index]!.id)
      })
    })
    requestForOffer.swaps?.forEach((swap, index) => {
      const expectedSwap = expected.swaps?.[index]
      expect(omit(['offer'], swap)).toStrictEqual(omit(['offer'], expectedSwap))
    })
  })
})
