import { Query } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function queryLimit<AppModelType>(limit?: number) {
  return function (query: Query<AppModelType>): Query<AppModelType> {
    if (isNil(limit)) {
      return query
    }
    return query.limit(limit)
  }
}
