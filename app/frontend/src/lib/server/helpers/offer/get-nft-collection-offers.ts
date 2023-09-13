import { OfferFilterAsReceiver } from '@echo/firestore/constants/offer-filter-as'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getOffersForCollectionAsReceiverItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-receiver-item'
import { getOffersForCollectionAsSenderItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-sender-item'
import { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'
import { both, has, isNotNil } from 'ramda'

export async function getNftCollectionOffers(
  collectionId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
) {
  try {
    if (both(isNotNil, has('as'))(filters)) {
      if (filters.as === OfferFilterAsReceiver) {
        return await getOffersForCollectionAsReceiverItem(collectionId, filters, constraints)
      }
      return await getOffersForCollectionAsSenderItem(collectionId, filters, constraints)
    }
    return await getOffersForCollection(collectionId, filters, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting offers for collection with id ${collectionId} with filters ${JSON.stringify(
        filters
      )} and constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
