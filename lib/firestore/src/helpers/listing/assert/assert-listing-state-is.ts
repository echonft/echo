import { assertListing } from './assert-listing'
import { Listing, ListingState } from '@echo/firestore-types'

export function assertListingStateIs(
  listing: Partial<Partial<Listing>> | undefined,
  state: ListingState
): asserts listing is NonNullable<Partial<Listing>> {
  assertListing(listing)
  if (listing.state !== state) {
    throw Error(`listing state is not ${state}`)
  }
}
