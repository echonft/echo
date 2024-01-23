import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_EXPIRED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'

export function getListingDetailsContainerBackground(listing: Listing) {
  switch (listing.state) {
    case LISTING_STATE_OPEN:
    case LISTING_STATE_OFFERS_PENDING:
    case LISTING_STATE_PARTIALLY_FULFILLED:
      return 'bg-offer-offerYellow'
    case LISTING_STATE_FULFILLED:
      return 'bg-offerGreen'
    case LISTING_STATE_CANCELLED:
    case LISTING_STATE_EXPIRED:
      return 'bg-offerRed'
  }
}
