import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, uniq } from 'ramda'

type PartialListing = Partial<WithFieldValue<Listing>>
type PartialListingWithItems = PartialListing & Record<'items', ListingItem[]>
export function addItemsNftIds(modelObject: PartialListing): PartialListing {
  return whenHas<'items', PartialListing, ListingItem[], PartialListing>(
    'items',
    converge<
      PartialListing,
      [
        (model: PartialListingWithItems) => string,
        (model: PartialListingWithItems) => string[],
        (model: PartialListingWithItems) => PartialListing
      ]
    >(assoc, [
      always('itemsNftIds'),
      pipe(prop('items'), map<ListingItem, string>(nonNullableReturn(path(['nft', 'id']))), uniq),
      identity
    ])
  )(modelObject)
}
