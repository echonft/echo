import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'

export interface ListingOffer {
  id: string
  offerId: string
  listingId: string
  fulfillingStatus: ListingOfferFulfillingStatus
}
