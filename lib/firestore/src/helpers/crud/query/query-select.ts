import { type FieldPath, Query } from 'firebase-admin/firestore'

export function querySelect<T>(...field: (string | FieldPath)[]) {
  return function (query: Query<T>): Query<T> {
    return query.select(...field) as Query<T>
  }
}
