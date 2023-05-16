import { RequestForOffer } from '@echo/model'
import { expect } from '@jest/globals'
import { omit } from 'ramda'

export function requestForOfferEquals(a: RequestForOffer, b: RequestForOffer) {
  expect(omit(['offers', 'swaps', 'items'], a)).toStrictEqual(omit(['offers', 'swaps', 'items'], b))
  a.items.forEach((item, index) => {
    expect(item.contract).toStrictEqual(b.items[index]!.contract)
    expect(item.balance).toBe(b.items[index]!.balance)
    expect(item.tokenId.toString()).toBe(b.items[index]!.tokenId.toString())
  })
  a.offers?.forEach((offer, index) => {
    const expectedOffer = b.offers?.[index]
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
  a.swaps?.forEach((swap, index) => {
    const expectedSwap = b.swaps?.[index]
    expect(omit(['offer'], swap)).toStrictEqual(omit(['offer'], expectedSwap))
  })
}
