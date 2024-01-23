import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import { COLOR_GREEN, COLOR_RED, COLOR_YELLOW } from '@echo/ui/constants/color'
import type { CardStatusColor } from '@echo/ui/types/card-status-color'

export const getListingStatusColor = (listing: Listing): CardStatusColor => {
  switch (listing.state) {
    case LISTING_STATE_OPEN:
    case LISTING_STATE_OFFERS_PENDING:
    case LISTING_STATE_PARTIALLY_FULFILLED:
      return COLOR_YELLOW
    case LISTING_STATE_FULFILLED:
      return COLOR_GREEN
    case LISTING_STATE_CANCELLED:
    case LISTING_STATE_EXPIRED:
      return COLOR_RED
  }
}
