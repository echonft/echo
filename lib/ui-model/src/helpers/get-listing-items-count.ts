import { Listing } from '../types/listing'
import { NewListing } from '../types/new-listing'

// TODO Validate the behaviour here, but I don't think you can have a listing
// with both targets and items.
// Currently, if there is both, the function returns items count.
export const getListingItemsCount = (listing: NewListing | Listing) => listing.items.length || listing.targets.length
