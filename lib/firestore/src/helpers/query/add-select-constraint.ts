import { isIn } from '@echo/utils'
import { CollectionReference, Query } from 'firebase-admin/firestore'
import { filter, is, isEmpty } from 'ramda'

export function addSelectConstraint<T>(
  query: CollectionReference<T> | Query<T>,
  selectFields: string | string[],
  availableFields: string[]
) {
  const validFields = is(Array, selectFields)
    ? filter(isIn(availableFields), selectFields)
    : filter(isIn(availableFields), [selectFields])
  if (isEmpty(validFields)) {
    return query
  }
  return query.select(...validFields) as Query<T>
}
