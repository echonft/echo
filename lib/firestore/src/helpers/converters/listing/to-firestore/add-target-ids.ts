import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, sort, uniq } from 'ramda'

const key = 'targets'
type Key = typeof key
type PartialListing = Partial<WithFieldValue<Listing>>
type PartialListingWithTargets = PartialListing & Record<Key, ListingTarget[]>
export function addTargetIds(modelObject: PartialListing): PartialListing {
  return whenHas<Key, PartialListing, ListingTarget[], PartialListing>(
    key,
    converge<
      PartialListing,
      [
        (model: PartialListingWithTargets) => string,
        (model: PartialListingWithTargets) => string[],
        (model: PartialListingWithTargets) => PartialListingWithTargets
      ]
    >(assoc, [
      always('targetsIds'),
      pipe(
        prop(key),
        map<ListingTarget, string>(nonNullableReturn(path(['collection', 'id']))),
        uniq,
        sort(stringComparator)
      ),
      identity
    ])
  )(modelObject)
}
