import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'

export interface ListingOfferDocumentData {
  listingId: string
  offerId: string
  fulfillingStatus: ListingOfferFulfillingStatus
}
