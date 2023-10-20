import { isIn } from '@echo/utils/fp/is-in'
import { type Query } from 'firebase-admin/lib/firestore'
import { concat, filter, includes, isEmpty, unless } from 'ramda'

export function addSelectConstraint<T>(query: Query<T>, selectFields: string[], availableFields: string[]) {
  const validFields = filter(isIn(availableFields), selectFields)
  if (isEmpty(validFields)) {
    return query
  }
  // add id field if it's not present - select should always have id
  // TODO do the same for every nested documents if they are in fields
  return query.select(...unless(includes('id'), concat(['id']))(validFields)) as Query<T>
}
