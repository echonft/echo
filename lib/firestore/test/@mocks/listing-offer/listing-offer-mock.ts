import { type ListingOffer } from '@echo/firestore/types/model/listing-offer/listing-offer'
import { ListingOfferFulfillingStatus } from '@echo/firestore/types/model/listing-offer/listing-offer-fulfilling-status'

export const listingOfferMock: Record<string, ListingOffer> = {
  iVWbfiUCYlNGKEAvQoF8: {
    id: 'iVWbfiUCYlNGKEAvQoF8',
    listingId: 'jUzMtPGKM62mMhEcmbN4',
    offerId: 'ASkFpKoHEHVH0gd69t1G',
    fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
  },
  T5UgZBVfjyqjyJs3KGek: {
    id: 'T5UgZBVfjyqjyJs3KGek',
    listingId: 'jUzMtPGKM62mMhEcmbN4',
    offerId: 'LyCfl6Eg7JKuD7XJ6IPi',
    fulfillingStatus: ListingOfferFulfillingStatus.PARTIALLY
  }
}
