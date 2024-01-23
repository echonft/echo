import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, uniq } from 'ramda'

const key = 'items' as const
type Key = typeof key
type PartialListing = Partial<WithFieldValue<Listing>>
type PartialListingWithItems = PartialListing & Record<Key, ListingItem[]>
export function addItemsNftIds(modelObject: PartialListing): PartialListing {
  return whenHas<Key, PartialListing, ListingItem[], PartialListing>(
    key,
    converge<
      PartialListing,
      [
        (model: PartialListingWithItems) => string,
        (model: PartialListingWithItems) => string[],
        (model: PartialListingWithItems) => PartialListing
      ]
    >(assoc, [
      always('itemsNftIds'),
      pipe(prop(key), map<ListingItem, string>(nonNullableReturn(path(['nft', 'id']))), uniq),
      identity
    ])
  )(modelObject)
}
