import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { Color } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getListingStatusColor = (listing: Listing): CardStatusColor => {
  switch (listing.state) {
    case ListingState.Open:
      return Color.Green
    case ListingState.Cancelled:
    case ListingState.Expired:
      return Color.Red
  }
}
