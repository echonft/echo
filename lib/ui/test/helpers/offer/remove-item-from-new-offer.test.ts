import { removeItemFromNewOffer } from '@echo/ui/helpers/offer/remove-item-from-new-offer'
import type { NewOffer } from '@echo/ui/types/model/new-offer'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import type { User } from '@echo/ui/types/model/user'
import { describe, expect, it } from '@jest/globals'

describe('helpers - offer - removeItemFromNewOffer', () => {
  it('remove the right receiver item', () => {
    const receiver = { username: 'receiver' } as User
    const item1 = { nft: { id: '1' } } as OfferItem
    const item2 = { nft: { id: '2' } } as OfferItem
    const item3 = { nft: { id: '3' } } as OfferItem
    const offer = {
      receiver,
      receiverItems: [item1, item2, item3],
      senderItems: [item1, item2, item3]
    } as NewOffer
    expect(removeItemFromNewOffer(item2.nft.id, true)(offer)).toStrictEqual({
      receiver,
      receiverItems: [item1, item3],
      senderItems: [item1, item2, item3]
    })
  })

  it('remove the right sender item', () => {
    const receiver = { username: 'receiver' } as User
    const item1 = { nft: { id: '1' } } as OfferItem
    const item2 = { nft: { id: '2' } } as OfferItem
    const item3 = { nft: { id: '3' } } as OfferItem
    const offer = {
      receiver,
      receiverItems: [item1, item2, item3],
      senderItems: [item1, item2, item3]
    } as NewOffer
    expect(removeItemFromNewOffer(item3.nft.id, false)(offer)).toStrictEqual({
      receiver,
      receiverItems: [item1, item2, item3],
      senderItems: [item1, item2]
    })
  })
})
