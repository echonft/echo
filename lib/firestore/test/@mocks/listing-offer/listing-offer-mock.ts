import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { LISTING_MOCK_ID } from '@echo/model-mocks/listing/listing-mock'
import { OFFER_MOCK_FROM_JOHNNYCAGE_ID, OFFER_MOCK_TO_JOHNNYCAGE_ID } from '@echo/model-mocks/offer/offer-mock'

export const listingOfferMock: Record<string, ListingOffer> = {
  iVWbfiUCYlNGKEAvQoF8: {
    listingId: LISTING_MOCK_ID,
    offerId: OFFER_MOCK_FROM_JOHNNYCAGE_ID,
    fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
  },
  T5UgZBVfjyqjyJs3KGek: {
    listingId: LISTING_MOCK_ID,
    offerId: OFFER_MOCK_TO_JOHNNYCAGE_ID,
    fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
  }
}
