import { removeItemFromNewOffer } from '../../src/helpers/remove-item-from-new-offer'
import { NewOffer, OfferItem, User } from '@echo/ui-model'
import { describe, expect, it } from '@jest/globals'

describe('helpers - removeItemFromNewOffer', () => {
  it('remove the right receiver item', () => {
    const receiver = { id: 'receiver' } as User
    const item1 = { id: '1' } as OfferItem
    const item2 = { id: '2' } as OfferItem
    const item3 = { id: '3' } as OfferItem
    const offer = {
      receiver,
      receiverItems: [item1, item2, item3],
      senderItems: [item1, item2, item3]
    } as NewOffer
    expect(removeItemFromNewOffer(item2, true)(offer)).toStrictEqual({
      receiver,
      receiverItems: [item1, item3],
      senderItems: [item1, item2, item3]
    })
  })

  it('remove the right sender item', () => {
    const receiver = { id: 'receiver' } as User
    const item1 = { id: '1' } as OfferItem
    const item2 = { id: '2' } as OfferItem
    const item3 = { id: '3' } as OfferItem
    const offer = {
      receiver,
      receiverItems: [item1, item2, item3],
      senderItems: [item1, item2, item3]
    } as NewOffer
    expect(removeItemFromNewOffer(item3, false)(offer)).toStrictEqual({
      receiver,
      receiverItems: [item1, item2, item3],
      senderItems: [item1, item2]
    })
  })
})
