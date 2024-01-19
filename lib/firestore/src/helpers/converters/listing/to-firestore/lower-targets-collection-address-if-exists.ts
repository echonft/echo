import { lowerTargetsCollectionAddress } from '@echo/firestore/helpers/converters/listing/lower-targets-collection-address'
import type { Listing } from '@echo/model/types/listing'
import type { ListingTarget } from '@echo/model/types/listing-target'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

type PartialListing = Partial<WithFieldValue<Listing>>
export function lowerTargetsCollectionAddressIfExists(listing: PartialListing): PartialListing {
  return whenHas<'targets', PartialListing, ListingTarget[], PartialListing>(
    'targets',
    lowerTargetsCollectionAddress
  )(listing)
}
