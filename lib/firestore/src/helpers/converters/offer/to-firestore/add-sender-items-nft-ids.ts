import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, uniq } from 'ramda'

const key = 'senderItems' as const
type Key = typeof key
type PartialOffer = Partial<WithFieldValue<Offer>>
type PartialOfferWithSenderItems = PartialOffer & Record<Key, OfferItem[]>
export function addSenderItemsNftIds(modelObject: PartialOffer): PartialOffer {
  return whenHas<Key, PartialOffer, OfferItem[], PartialOffer>(
    key,
    converge<
      PartialOffer,
      [
        (model: PartialOfferWithSenderItems) => string,
        (model: PartialOfferWithSenderItems) => string[],
        (model: PartialOfferWithSenderItems) => PartialOffer
      ]
    >(assoc, [
      always('senderItemsNftIds'),
      pipe(prop(key), map<OfferItem, string>(nonNullableReturn(path(['nft', 'id']))), uniq),
      identity
    ])
  )(modelObject)
}
