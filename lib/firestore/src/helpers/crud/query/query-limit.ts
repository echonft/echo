import { type DocumentData, Query } from 'firebase-admin/firestore'
import { isNil } from 'ramda'

export function queryLimit<AppModelType, DbModelType extends DocumentData>(limit?: number) {
  return function (query: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    if (isNil(limit)) {
      return query
    }
    return query.limit(limit)
  }
}
