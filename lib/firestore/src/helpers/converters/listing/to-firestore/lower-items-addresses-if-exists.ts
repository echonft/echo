import { lowerItemsAddresses } from '@echo/firestore/helpers/converters/listing/lower-items-addresses'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

type PartialListing = Partial<WithFieldValue<Listing>>
export function lowerItemsAddressesIfExists(listing: PartialListing): PartialListing {
  return whenHas<'items', PartialListing, ListingItem[], PartialListing>('items', lowerItemsAddresses)(listing)
}
