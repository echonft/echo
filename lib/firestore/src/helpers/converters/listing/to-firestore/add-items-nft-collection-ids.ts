import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, sort, uniq } from 'ramda'

const key = 'items'
type Key = typeof key
type PartialListing = Partial<WithFieldValue<Listing>>
type PartialListingWithItems = PartialListing & Record<Key, ListingItem[]>
export function addItemsNftCollectionIds(modelObject: PartialListing): PartialListing {
  return whenHas<Key, PartialListing, ListingItem[], PartialListing>(
    key,
    converge<
      PartialListing,
      [
        (model: PartialListingWithItems) => string,
        (model: PartialListingWithItems) => string[],
        (model: PartialListingWithItems) => PartialListingWithItems
      ]
    >(assoc, [
      always('itemsNftCollectionIds'),
      pipe(
        prop(key),
        map<ListingItem, string>(nonNullableReturn(path(['nft', 'collection', 'id']))),
        uniq,
        sort(stringComparator)
      ),
      identity
    ])
  )(modelObject)
}
