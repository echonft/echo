import { requestsForOffer } from '../../utils/test/mocks/request-for-offer/request-for-offer'
import { requestsForOfferData } from '../../utils/test/mocks/request-for-offer/request-for-offer-data'
import { mapRequestForOffer } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('mapRequestForOffer', () => {
  it('request for offer mapping', async () => {
    const expected = requestsForOffer['jUzMtPGKM62mMhEcmbN4']!
    const requestForOffer = await mapRequestForOffer(Promise.resolve(requestsForOfferData['jUzMtPGKM62mMhEcmbN4']!))
    expect(omit(['offers', 'swaps', 'items'], requestForOffer)).toStrictEqual(
      omit(['offers', 'swaps', 'items'], expected)
    )
    requestForOffer.items.forEach((item, index) => {
      expect(item.contract).toStrictEqual(expected.items[index]!.contract)
      expect(item.balance).toBe(expected.items[index]!.balance)
      expect(item.tokenId.toString()).toBe(expected.items[index]!.tokenId.toString())
    })
    requestForOffer.offers?.forEach((offer, index) => {
      const expectedOffer = expected.offers?.[index]
      expect(omit(['senderItems', 'receiverItems'], offer)).toStrictEqual(
        omit(['senderItems', 'receiverItems'], expectedOffer)
      )
      offer.senderItems.forEach((item, index) => {
        expect(item.contract).toStrictEqual(expectedOffer?.senderItems[index]!.contract)
        expect(item.balance).toBe(expectedOffer?.senderItems[index]!.balance)
        expect(item.tokenId.toString()).toBe(expectedOffer?.senderItems[index]!.tokenId.toString())
      })
      offer.receiverItems.forEach((item, index) => {
        expect(item.contract).toStrictEqual(expectedOffer?.receiverItems[index]!.contract)
        expect(item.balance).toBe(expectedOffer?.receiverItems[index]!.balance)
        expect(item.tokenId.toString()).toBe(expectedOffer?.receiverItems[index]!.tokenId.toString())
      })
    })
    requestForOffer.swaps?.forEach((swap, index) => {
      const expectedSwap = expected.swaps?.[index]
      expect(omit(['offer'], swap)).toStrictEqual(omit(['offer'], expectedSwap))
    })
  })
})
