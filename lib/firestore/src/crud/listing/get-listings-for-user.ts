import { LISTING_FILTER_AS_ITEM } from '@echo/firestore/constants/listing/listing-filter-as'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getListingsQueryResults } from '@echo/firestore/helpers/crud/listing/get-listings-query-results'
import { mergeQueryResults } from '@echo/firestore/helpers/crud/query/merge-query-results'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Listing } from '@echo/model/types/listing'
import { isNil, map, path, pipe, uniq } from 'ramda'

/**
 * Find listings for which the targets include any of the collection of the NFTs owned by a user
 * TODO array-contains-any is limited to 30 disjunctions, so we will have to make this call recursive when we can reach that number
 * in this case we will have to filter and apply the constraints to the results instead of the queries
 * @param username
 * @param filters
 * @param constraints
 */
export async function getListingsForUser(
  username: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints<Listing>
): Promise<Listing[]> {
  const getResults = getListingsQueryResults(filters, constraints)
  async function getAsTargetQuery(username: string) {
    const nfts = await getNftsForOwner(username)
    const collectionIds = pipe(map(path(['collection', 'id'])), uniq)(nfts)
    return getListingsCollectionReference()
      .where('creator.username', '!=', username)
      .where('targetsIds', 'array-contains-any', collectionIds)
  }
  const asItemQuery = getListingsCollectionReference().where('creator.username', '==', username)
  if (isNil(filters) || isNil(filters.as)) {
    const asTargetQuery = await getAsTargetQuery(username)
    return mergeQueryResults(asItemQuery, asTargetQuery, getResults)
  }
  if (filters.as === LISTING_FILTER_AS_ITEM) {
    return getResults(asItemQuery)
  }
  const asTargetQuery = await getAsTargetQuery(username)
  return getResults(asTargetQuery)
}
