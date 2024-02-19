import { Query } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function queryOffset<T>(offset?: number) {
  return function (query: Query<T>): Query<T> {
    if (isNil(offset)) {
      return query
    }
    return query.offset(offset)
  }
}
