import type { Item } from '@echo/model/types/item'
import { type Offer } from '@echo/model/types/offer'
import { type NonEmptyArray } from 'ramda'

export function offerReceiverItems(offer: Offer): NonEmptyArray<Item> {
  return offer.receiverItems
}
