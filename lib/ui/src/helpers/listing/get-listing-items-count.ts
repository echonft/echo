// Currently, if there is both, the function returns items count.
import type { Listing } from '@echo/ui/types/model/listing'
import type { NewListing } from '@echo/ui/types/model/new-listing'

export const getListingItemsCount = (listing: NewListing | Listing) => listing.items.length || listing.targets.length
