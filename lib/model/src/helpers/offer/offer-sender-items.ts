import type { Item } from '@echo/model/types/item/item'
import { type Offer } from '@echo/model/types/offer/offer'
import { type NonEmptyArray } from 'ramda'

export function offerSenderItems(offer: Offer): NonEmptyArray<Item> {
  return offer.senderItems
}
