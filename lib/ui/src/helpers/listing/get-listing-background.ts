import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { BG_DEFAULT, BG_GREEN_GRADIENT, BG_RED_GRADIENT, BG_YELLOW_GRADIENT } from '@echo/ui/constants/background'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getListingBackground(listing: Nullable<Listing>) {
  if (isNil(listing)) {
    return BG_DEFAULT
  }
  switch (listing.state) {
    case ListingState.Open:
    case ListingState.OffersPending:
      return BG_YELLOW_GRADIENT
    case ListingState.PartiallyFulfilled:
    case ListingState.Fulfilled:
      return BG_GREEN_GRADIENT
    case ListingState.Cancelled:
    case ListingState.Expired:
      return BG_RED_GRADIENT
  }
}
