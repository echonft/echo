import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, uniq } from 'ramda'

const key = 'targets' as const
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
      pipe(prop(key), map<ListingTarget, string>(nonNullableReturn(path(['collection', 'id']))), uniq),
      identity
    ])
  )(modelObject)
}
