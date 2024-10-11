import type { DocumentData, Filter, Query } from 'firebase-admin/firestore'

export function queryWhereFilter<AppModelType, DbModelType extends DocumentData>(filter: Filter) {
  return function (query: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query.where(filter)
  }
}
