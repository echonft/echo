import type { ListingOfferFill } from '@echo/model/constants/listing-offer-fill'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'

export interface ListingOffer extends Offer {
  listing: Listing
  offer: Offer
  fill: ListingOfferFill
}
