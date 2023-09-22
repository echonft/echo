import { CollectionName } from '@echo/firestore/constants/collection-name'
import { listingDataConverter } from '@echo/firestore/converters/listing/listing-data-converter'
import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { filterExpiredResults } from '@echo/firestore/helpers/crud/filter-expired-results'
import { addListingQueryFilters } from '@echo/firestore/helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '@echo/firestore/helpers/query/add-constraints-to-query'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type { FirestoreListing } from '@echo/firestore/types/model/listing/firestore-listing'
import { listingFields } from '@echo/firestore/types/model/listing/listing-document-data'
import type { ListingQueryFilters } from '@echo/firestore/types/query/listing-query-filters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { invoker, map, path, pipe, uniq } from 'ramda'

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
): Promise<Partial<FirestoreListing>[]> {
  const nfts = await getNftsForOwner(username)
  const collectionIds = pipe(map(path(['collection', 'id'])), uniq)(nfts)
  let query = firestoreApp()
    .collection(CollectionName.LISTINGS)
    .where('creator.username', '!=', username)
    .where('targetsIds', 'array-contains-any', collectionIds)
    .withConverter(listingDataConverter)

  query = addListingQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const querySnapshot = await query.get()
  if (querySnapshot.empty || isNilOrEmpty(querySnapshot.docs)) {
    return []
  }

  const results = map(invoker(0, 'data'), querySnapshot.docs)
  return filterExpiredResults(results, constraints, filters)
}
