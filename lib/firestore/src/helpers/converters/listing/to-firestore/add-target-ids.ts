import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { always, assoc, converge, identity, map, path, pipe, prop, uniq } from 'ramda'

type PartialListing = Partial<WithFieldValue<Listing>>
type PartialListingWithTargets = PartialListing & Record<'targets', ListingTarget[]>
export function addTargetIds(modelObject: PartialListing): PartialListing {
  return whenHas<'targets', PartialListing, ListingTarget[], PartialListing>(
    'targets',
    converge<
      PartialListing,
      [
        (model: PartialListingWithTargets) => string,
        (model: PartialListingWithTargets) => string[],
        (model: PartialListingWithTargets) => PartialListingWithTargets
      ]
    >(assoc, [
      always('targetsIds'),
      pipe(prop('targets'), map<ListingTarget, string>(nonNullableReturn(path(['collection', 'id']))), uniq),
      identity
    ])
  )(modelObject)
}
