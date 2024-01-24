import type { Filter, Query } from 'firebase-admin/firestore'

export function queryWhereFilter<T>(filter: Filter) {
  return function (query: Query<T>): Query<T> {
    return query.where(filter)
  }
}
