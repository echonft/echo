import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import {
  PAGE_LAYOUT_BG_GREEN_GRADIENT,
  PAGE_LAYOUT_BG_RED_GRADIENT,
  PAGE_LAYOUT_BG_YELLOW_GRADIENT
} from '@echo/ui/constants/page-layout-background'

export function getListingPageLayoutBackground(listing: Listing) {
  switch (listing.state) {
    case LISTING_STATE_OPEN:
    case LISTING_STATE_OFFERS_PENDING:
      return PAGE_LAYOUT_BG_YELLOW_GRADIENT
    case LISTING_STATE_PARTIALLY_FULFILLED:
    case LISTING_STATE_FULFILLED:
      return PAGE_LAYOUT_BG_GREEN_GRADIENT
    case LISTING_STATE_CANCELLED:
    case LISTING_STATE_EXPIRED:
      return PAGE_LAYOUT_BG_RED_GRADIENT
  }
}
