import isIn from '@echo/utils/is-in'
import { Query } from 'firebase-admin/firestore'
import { filter, includes, is, isEmpty } from 'ramda'

export function addSelectConstraint<T>(query: Query<T>, selectFields: string | string[], availableFields: string[]) {
  const validFields = is(Array, selectFields)
    ? filter(isIn(availableFields), selectFields)
    : filter(isIn(availableFields), [selectFields])
  if (isEmpty(validFields)) {
    return query
  }
  // add id field if it's not present - select should always have id
  if (!includes('id', validFields)) {
    validFields.push('id')
  }
  // TODO do the same for every nested documents if they are in fields
  return query.select(...validFields) as Query<T>
}
