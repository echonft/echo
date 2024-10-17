import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getListingStatusColor = (listing: Listing): CardStatusColor => {
  switch (listing.state) {
    case ListingState.Open:
    case ListingState.OffersPending:
    case ListingState.PartiallyFulfilled:
      return COLOR_YELLOW
    case ListingState.Fulfilled:
      return COLOR_GREEN
    case ListingState.Cancelled:
    case ListingState.Expired:
      return COLOR_RED
  }
}
