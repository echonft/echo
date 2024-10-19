import type { Item } from '@echo/model/types/item/item'
import { type Offer } from '@echo/model/types/offer/offer'
import { nonEmptyConcat } from '@echo/utils/fp/non-empty-concat'
import { type NonEmptyArray } from 'ramda'

export function offerItems(offer: Offer): NonEmptyArray<Item> {
  return nonEmptyConcat(offer.receiverItems, offer.senderItems)
}
