import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import type { WithId } from '@echo/model/types/with-id'

export interface ListingOffer extends WithId {
  offerId: string
  listingId: string
  fulfillingStatus: ListingOfferFulfillingStatus
}
