import { CollectionName } from '../../constants/collection-name'
import { listingDataConverter } from '../../converters/listing-data-converter'
import { addConstraintsToQuery } from '../../helpers/query/add-constraints-to-query'
import { firestore } from '../../services/firestore'
import { QueryConstraints } from '../../types/abstract/query-constraints'
import { Listing } from '../../types/model/listing'
import { listingFields } from '../../types/model/listing-document-data'
import { ListingState } from '../../types/model/listing-state'
import { intersects, isNilOrEmpty, single } from '@echo/utils'
import dayjs from 'dayjs'
import { Query } from 'firebase-admin/firestore'
import { QueryDocumentSnapshot } from 'firebase-admin/lib/firestore'
import { head, invoker, isNil, map } from 'ramda'

export interface GetListingsForCreatorFilters {
  states?: ListingState[]
  notStates?: ListingState[]
  includeExpired?: boolean
}

export async function getListingsForCreator(
  userId: string,
  filters?: GetListingsForCreatorFilters,
  constraints?: QueryConstraints
) {
  let query = firestore()
    .collection(CollectionName.LISTINGS)
    .where('creatorId', '==', userId)
    .withConverter(listingDataConverter)

  query = applyFilters(query, filters)
  query = addConstraintsToQuery(query, constraints, listingFields)
  const querySnapshot = await query.get()
  if (querySnapshot.empty) {
    return [] as Listing[]
  }

  const documentSnapshot = head<QueryDocumentSnapshot<Listing>>(querySnapshot.docs)
  if (isNil(documentSnapshot)) {
    return [] as Listing[]
  }

  return map(invoker(0, 'data'), querySnapshot.docs) as Listing[]
}

function applyFilters(query: Query<Listing>, filters?: GetListingsForCreatorFilters) {
  if (isNil(filters)) {
    return query
  }
  let filteredQuery = query
  const { states, notStates, includeExpired } = filters

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
      filteredQuery = filteredQuery.where('state', 'not-in', states)
    }
  }
  if (isNil(includeExpired) || !includeExpired) {
    filteredQuery = filteredQuery.where('expiresAt', '>', dayjs().unix())
  }
  return filteredQuery
}
