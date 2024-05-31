import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'
import { listingMockId } from '@echo/model-mocks/listing/listing-mock'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model-mocks/offer/offer-mock'

export function listingOfferMock(): Record<string, ListingOffer> {
  return {
    iVWbfiUCYlNGKEAvQoF8: {
      listingId: listingMockId(),
      offerId: offerMockFromJohnnycageId(),
      fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
    },
    T5UgZBVfjyqjyJs3KGek: {
      listingId: listingMockId(),
      offerId: offerMockToJohnnycageId(),
      fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
    }
  }
}
