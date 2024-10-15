import { ListingOfferFulfillingStatus } from '@echo/firestore/constants/listing-offer-fulfilling-status'
import { type ListingOfferDocumentData } from '@echo/firestore/types/model/listing-offer/listing-offer-document-data'
import { listingMockId } from '@echo/model/mocks/listing/listing-mock'
import { offerMockFromJohnnycageId, offerMockToJohnnycageId } from '@echo/model/mocks/offer/offer-mock'

export function listingOfferMock(): Record<string, ListingOfferDocumentData> {
  return {
    iVWbfiUCYlNGKEAvQoF8: {
      listingId: listingMockId(),
      offerId: offerMockFromJohnnycageId(),
      fulfillingStatus: ListingOfferFulfillingStatus.Partially
    },
    T5UgZBVfjyqjyJs3KGek: {
      listingId: listingMockId(),
      offerId: offerMockToJohnnycageId(),
      fulfillingStatus: ListingOfferFulfillingStatus.Partially
    }
  }
}
