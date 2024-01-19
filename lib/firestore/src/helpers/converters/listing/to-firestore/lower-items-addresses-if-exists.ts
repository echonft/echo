import { lowerItemsAddresses } from '@echo/firestore/helpers/converters/listing/lower-items-addresses'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

const key = 'items' as const
type Key = typeof key
type PartialListing = Partial<WithFieldValue<Listing>>
export function lowerItemsAddressesIfExists(listing: PartialListing): PartialListing {
  return whenHas<Key, PartialListing, ListingItem[], PartialListing>(key, lowerItemsAddresses)(listing)
}
