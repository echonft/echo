import type { Query } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function queryLimit<T>(limit?: number) {
  return function (query: Query<T>): Query<T> {
    if (isNil(limit)) {
      return query
    }
    return query.limit(limit)
  }
}
