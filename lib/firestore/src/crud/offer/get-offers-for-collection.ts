import { getOffersForCollectionAsReceiverItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-receiver-item'
import { getOffersForCollectionAsSenderItem } from '@echo/firestore/crud/offer/get-offers-for-collection-as-sender-item'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { concat, eqProps, pipe, uniqWith } from 'ramda'

export async function getOffersForCollection(
  collectionId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<FirestoreOffer>[]> {
  const resultsAsReceiverItem = await getOffersForCollectionAsReceiverItem(collectionId, filters, constraints)
  const resultsAsSenderItem = await getOffersForCollectionAsSenderItem(collectionId, filters, constraints)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('id')))(resultsAsReceiverItem, resultsAsSenderItem) as Partial<FirestoreOffer>[]
}
