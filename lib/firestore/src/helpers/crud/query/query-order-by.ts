import type { FieldPath, OrderByDirection, Query } from 'firebase-admin/firestore'

export function queryOrderBy<T>(fieldPath: string | FieldPath, directionStr?: OrderByDirection) {
  return function (query: Query<T>): Query<T> {
    return query.orderBy(fieldPath, directionStr)
  }
}
