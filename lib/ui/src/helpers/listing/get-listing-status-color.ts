import { ListingState } from '@echo/model/constants/listing-state'
import { Color } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getListingStatusColor = (state: ListingState): CardStatusColor => {
  switch (state) {
    case ListingState.Open:
      return Color.Green
    case ListingState.Cancelled:
    case ListingState.Expired:
      return Color.Red
  }
}
