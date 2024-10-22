import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { Background } from '@echo/ui/constants/background'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'

export function getListingBackground(listing: Nullable<Listing>) {
  if (isNil(listing)) {
    return Background.Default
  }
  switch (listing.state) {
    case ListingState.Open:
      return Background.GreenGradient
    case ListingState.Cancelled:
    case ListingState.Expired:
      return Background.RedGradient
  }
}
