import { getOffersForCollectionAsReceiverItem } from './get-offers-for-collection-as-receiver-item'
import { getOffersForCollectionAsSenderItem } from './get-offers-for-collection-as-sender-item'
import { Offer, OfferQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { concat, eqProps, pipe, uniqWith } from 'ramda'

export async function getOffersForCollection(
  collectionId: string,
  filters?: OfferQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<Offer>[]> {
  const resultsAsReceiverItem = await getOffersForCollectionAsReceiverItem(collectionId, filters, constraints)
  const resultsAsSenderItem = await getOffersForCollectionAsSenderItem(collectionId, filters, constraints)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('id')))(resultsAsReceiverItem, resultsAsSenderItem) as Partial<Offer>[]
}
