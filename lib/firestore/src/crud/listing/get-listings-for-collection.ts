import { getListingsForCollectionAsItem } from '@echo/firestore/crud/listing/get-listings-for-collection-as-item'
import { getListingsForCollectionAsTarget } from '@echo/firestore/crud/listing/get-listings-for-collection-as-target'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { concat, eqProps, pipe, uniqWith } from 'ramda'

/**
 * Find listings for which a collection is in either the targets or the items
 * @param collectionId
 * @param filters
 * @param constraints
 */
export async function getListingsForCollection(
  collectionId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<FirestoreListing[]> {
  const resultsAsItem = await getListingsForCollectionAsItem(collectionId, filters, constraints)
  const resultsAsTarget = await getListingsForCollectionAsTarget(collectionId, filters, constraints)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(concat, uniqWith(eqProps('id')))(resultsAsItem, resultsAsTarget) as FirestoreListing[]
}
