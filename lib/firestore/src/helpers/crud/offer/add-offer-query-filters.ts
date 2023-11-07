import { type OfferQueryFilters } from '@echo/firestore/types/query/offer-query-filters'
import { type Offer } from '@echo/model/types/offer'
import { intersects } from '@echo/utils/fp/intersects'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { single } from '@echo/utils/fp/single'
import { Query } from 'firebase-admin/firestore'
import { head, isNil } from 'ramda'

export function addOfferQueryFilters(query: Query<Offer>, filters?: OfferQueryFilters) {
  if (isNil(filters)) {
    return query
  }
  let filteredQuery = query
  const { state, notState } = filters

  if (!isNilOrEmpty(state) && !isNilOrEmpty(notState)) {
    if (intersects(state, notState)) {
      throw Error('state to filter in and state to filter out cannot overlap')
    }
  }
  if (!isNilOrEmpty(state)) {
    if (single(state)) {
      filteredQuery = filteredQuery.where('state', '==', head(state))
    } else {
      filteredQuery = filteredQuery.where('state', 'in', state)
    }
  }
  if (!isNilOrEmpty(notState)) {
    if (single(notState)) {
      filteredQuery = filteredQuery.where('state', '!=', head(notState))
    } else {
      filteredQuery = filteredQuery.where('state', 'not-in', notState)
    }
  }
  return filteredQuery
}
