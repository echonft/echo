import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, sort, uniq } from 'ramda'

const key = 'receiverItems' as const
type Key = typeof key
type PartialOffer = Partial<WithFieldValue<Offer>>
type PartialOfferWithReceiverItems = PartialOffer & Record<Key, OfferItem[]>
export function addReceiverItemsNftCollectionIds(modelObject: PartialOffer): PartialOffer {
  return whenHas<Key, PartialOffer, OfferItem[], PartialOffer>(
    key,
    converge<
      PartialOffer,
      [
        (model: PartialOfferWithReceiverItems) => string,
        (model: PartialOfferWithReceiverItems) => string[],
        (model: PartialOfferWithReceiverItems) => PartialOfferWithReceiverItems
      ]
    >(assoc, [
      always('receiverItemsNftCollectionIds'),
      pipe(
        prop(key),
        map<OfferItem, string>(nonNullableReturn(path(['nft', 'collection', 'id']))),
        uniq,
        sort(stringComparator)
      ),
      identity
    ])
  )(modelObject)
}
