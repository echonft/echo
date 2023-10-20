import { listingFields } from '@echo/firestore/constants/fields/listing/listing-fields'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { getQueryDocumentsData } from '@echo/firestore/helpers/crud/get-query-documents-data'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { type ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { type Listing } from '@echo/model/types/listing'
import { map, path, pipe, uniq } from 'ramda'

/**
 * Find listings for which the targets include any of the collection of the NFTs owned by a user
 * TODO array-contains-any is limited to 30 disjunctions, so we will have to make this call recursive when we can reach that number
 * in this case we will have to filter and apply the constraints to the results instead of the queries
 * @param username
 * @param filters
 * @param constraints
 */
export async function getListingsForUserTarget(
  username: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Listing[]> {
  const nfts = await getNftsForOwner(username)
  const collectionIds = pipe(map(path(['collection', 'id'])), uniq)(nfts)
  let query = getListingsCollectionReference()
    .where('creator.username', '!=', username)
    .where('targetsIds', 'array-contains-any', collectionIds)
  query = addListingQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const results = await getQueryDocumentsData(query)
  return filterExpiredResults(results, constraints, filters)
}
