import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'

export interface ListingOffer {
  listingId: string
  offerId: string
  fulfillingStatus: ListingOfferFulfillingStatus
}
