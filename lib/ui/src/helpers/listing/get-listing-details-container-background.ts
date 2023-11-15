import {
  LISTING_STATE_CANCELLED,
  LISTING_STATE_FULFILLED,
  LISTING_STATE_OFFERS_PENDING,
  LISTING_STATE_OPEN,
  LISTING_STATE_PARTIALLY_FULFILLED
} from '@echo/model/constants/listing-states'
import { type Listing } from '@echo/model/types/listing'

export const getListingDetailsContainerBackground = (listing: Listing) => {
  const { expired, state } = listing
  switch (state) {
    case LISTING_STATE_OPEN:
    case LISTING_STATE_OFFERS_PENDING:
    case LISTING_STATE_PARTIALLY_FULFILLED:
      return expired ? 'bg-offer-red-gradient' : 'bg-offer-yellow-gradient'
    case LISTING_STATE_FULFILLED:
      return 'bg-offer-green-gradient'
    case LISTING_STATE_CANCELLED:
      return 'bg-offer-red-gradient'
  }
}
