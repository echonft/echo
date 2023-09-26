import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'

export interface FirestoreListingOffer {
  id: string
  offerId: string
  listingId: string
  fulfillingStatus: ListingOfferFulfillingStatus
}
