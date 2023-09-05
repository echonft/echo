import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { filterExpiredResults } from '../../helpers/crud/filter-expired-results'
import { addListingQueryFilters } from '../../helpers/crud/listing/add-listing-query-filters'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { addExpiresAtToSelectConstraint } from '../../helpers/query/add-expires-at-to-select-constraint'
import { firestore } from '../../services/firestore'
import { listingFields } from '../../types/model/listing-document-data'
import { Listing, ListingQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, invoker, isNil, map } from 'ramda'

export async function getListingsForCreator(
  userId: string,
  filters?: ListingQueryFilters,
  constraints?: QueryConstraints
): Promise<Partial<Listing>[]> {
  let query = firestore()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '==', userId)
    .withConverter(listingDataConverter)

  query = addListingQueryFilters(query, filters)
  // we need expiresAt for the filter, so we add it if it's not in the select constraint - it'll get removed later
  const validConstraints = addExpiresAtToSelectConstraint(constraints)
  query = addConstraintsToQuery(query, validConstraints, listingFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return []
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Listing>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return []
  }

  const results = map(invoker(0, 'data'), querySnapshot.docs)
  return filterExpiredResults(results, constraints, filters)
}
