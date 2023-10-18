import { OfferFilterAsReceiver } from '@echo/firestore/constants/offer-filter-as'
import { getOffersForCollection } from '@echo/firestore/crud/offer/get-offers-for-collection'
import { getOffersForCollectionAsReceiverItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-receiver-item'
import { getOffersForCollectionAsSenderItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-sender-item'
import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'
import { isNil } from 'ramda'

export async function getCollectionOffers(
  collectionId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
) {
  try {
    if (!isNil(filters) && !isNil(filters.as)) {
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
