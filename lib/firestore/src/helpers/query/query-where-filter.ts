import type { Filter, Query } from 'firebase-admin/firestore'

export function queryWhereFilter<AppModelType>(filter: Filter) {
  return function (query: Query<AppModelType>): Query<AppModelType> {
    return query.where(filter)
  }
}
