import { offerReceiverItems } from '@echo/model/helpers/offer/offer-receiver-items'
import { offerSenderItems } from '@echo/model/helpers/offer/offer-sender-items'
import type { Item } from '@echo/model/types/item/item'
import { type Offer } from '@echo/model/types/offer/offer'
import { concat, converge, type NonEmptyArray } from 'ramda'

export function offerItems(offer: Offer): NonEmptyArray<Item> {
  return converge(concat, [offerReceiverItems, offerSenderItems])(offer)
}
