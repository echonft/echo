import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing/listing-offer-fulfilling-status'

export interface ListingOfferDocumentData {
  listingId: string
  offerId: string
  fulfillingStatus: ListingOfferFulfillingStatus
}
