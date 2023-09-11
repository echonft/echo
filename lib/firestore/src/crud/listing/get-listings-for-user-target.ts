import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { filterExpiredResults } from '../../helpers/crud/filter-expired-results'
import { addListingQueryFilters } from '../../helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { firestore } from '../../services/firestore'
import { listingFields } from '../../types/model/listing-document-data'
import { getNftsForOwner } from '../nft/get-nfts-for-owner'
import { Listing, ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { head, invoker, isNil, map, path, pipe, uniq } from 'ramda'

/**
 * Find listings for which the targets include any of the collection of the NFTs owned by a user
 * TODO array-contains-any is limited to 30 disjunctions, so we will have to make this call recursive when we can reach that number
 * in this case we will have to filter and apply the constraints to the results instead of the queries
 * @param userId
 * @param filters
 * @param constraints
 */
export async function getListingsForUserTarget(
  userId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<Listing>[]> {
  const nfts = await getNftsForOwner(userId)
  const collectionIds = pipe(map(path(['collection', 'id'])), uniq)(nfts)
  let query = firestore()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '!=', userId)
    .where('targetsIds', 'array-contains-any', collectionIds)
    .withConverter(listingDataConverter)

  query = addListingQueryFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields, true)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return []
  }

  const documentSnapshot = head(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return []
  }

  const results = map(invoker(0, 'data'), querySnapshot.docs)
  return filterExpiredResults(results, constraints, filters)
}
