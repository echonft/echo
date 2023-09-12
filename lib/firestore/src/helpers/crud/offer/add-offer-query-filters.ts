import { Offer, OfferQueryFilters } from '@echo/firestore-types'
import intersects from '@echo/utils/intersects'
import isNilOrEmpty from '@echo/utils/is-nil-or-empty'
import single from '@echo/utils/single'
import { Query } from 'firebase-admin/lib/firestore'
import { head, isNil } from 'ramda'

export function addOfferQueryFilters(query: Query<Partial<Offer>>, filters?: OfferQueryFilters) {
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
