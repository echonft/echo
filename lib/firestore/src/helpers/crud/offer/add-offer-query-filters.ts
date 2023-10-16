import type { OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import type { Offer } from '@echo/model/types/offer'
import { intersects } from '@echo/utils/fp/intersects'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { single } from '@echo/utils/fp/single'
import type { Query } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export function addOfferQueryFilters(query: Query<Offer>, filters?: OfferQueryFilters) {
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
