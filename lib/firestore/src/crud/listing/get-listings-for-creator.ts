import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { dateIsPast } from '../../helpers/converters/from-firestore/date-is-past'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { addExpiresAtToSelectConstraint } from '../../helpers/query/add-expires-at-to-select-constraint'
import { firestore } from '../../services/firestore'
import { listingFields } from '../../types/model/listing-document-data'
import { Listing, ListingsQueryFilters, QueryConstraints } from '@echo/firestore-types'
import { intersects, isNilOrEmpty, single } from '@echo/utils'
import { Query } from 'firebase-admin/firestore'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { dissoc, head, invoker, is, isNil, map, pipe, propSatisfies, reject } from 'ramda'

export async function getListingsForCreator(
  userId: string,
  filters?: ListingsQueryFilters,
  constraints?: QueryConstraints
) {
  let query = firestore()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '==', userId)
    .withConverter(listingDataConverter)

  query = applyFilters(query, filters)
  // we need expiresAt for the filter, so we add it if it's not in the select constraint
  // we will remove it after
  const validConstraints = addExpiresAtToSelectConstraint(constraints)
  query = addConstraintsToQuery(query, validConstraints, listingFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Listing>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return [] as Listing[]
  }

  let results = map(invoker(0, 'data'), querySnapshot.docs) as Listing[]
  // can't use a filter on expiration date with anything else in Firestore, so we filter them manually if needed
  if (isNil(filters?.includeExpired) || !filters?.includeExpired) {
    results = reject(propSatisfies(dateIsPast, 'expiresAt'), results)
  }
  // if expiresAt was not in the select constraint, remove it from the results
  if (!isNil(constraints) && !isNil(constraints.select)) {
    const { select } = constraints
    if ((is(Array, select) && !select.includes('expiresAt')) || select !== 'expiresAt') {
      return map(pipe(dissoc('expiresAt'), dissoc('expired')), results) as Listing[]
    }
  }
  return results
}

function applyFilters(query: Query<Listing>, filters?: ListingsQueryFilters) {
  if (isNil(filters)) {
    return query
  }
  let filteredQuery = query
  const { states, notStates } = filters

  if (!isNilOrEmpty(states) && !isNilOrEmpty(notStates)) {
    if (intersects(states, notStates)) {
      throw Error('states to filter in and states to filter out cannot overlap')
    }
  }
  if (!isNilOrEmpty(states)) {
    if (single(states)) {
      filteredQuery = filteredQuery.where('state', '==', head(states))
    } else {
      filteredQuery = filteredQuery.where('state', 'in', states)
    }
  }
  if (!isNilOrEmpty(notStates)) {
    if (single(notStates)) {
      filteredQuery = filteredQuery.where('state', '!=', head(notStates))
    } else {
      filteredQuery = filteredQuery.where('state', 'not-in', notStates)
    }
  }
  return filteredQuery
}
