import { Listing } from '../types/listing'
import { NewListing } from '../types/new-listing'

// Currently, if there is both, the function returns items count.
export const getListingItemsCount = (listing: NewListing | Listing) => listing.items.length || listing.targets.length
