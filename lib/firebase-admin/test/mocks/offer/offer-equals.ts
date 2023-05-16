import { Offer } from '@echo/model'
import { expect } from '@jest/globals'
import { omit } from 'ramda'

export function offerEquals(a: Offer, b: Offer) {
  expect(omit(['senderItems', 'receiverItems'], a)).toStrictEqual(omit(['senderItems', 'receiverItems'], b))
  a.senderItems.forEach((item, index) => {
    expect(item.contract).toStrictEqual(b.senderItems[index]!.contract)
    expect(item.balance).toBe(b.senderItems[index]!.balance)
    expect(item.tokenId.toString()).toBe(b.senderItems[index]!.tokenId.toString())
  })
  a.receiverItems.forEach((item, index) => {
    expect(item.contract).toStrictEqual(b.receiverItems[index]!.contract)
    expect(item.balance).toBe(b.receiverItems[index]!.balance)
    expect(item.tokenId.toString()).toBe(b.receiverItems[index]!.tokenId.toString())
  })
}
