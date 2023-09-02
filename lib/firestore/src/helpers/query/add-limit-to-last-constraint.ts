import { CollectionReference, Query } from 'firebase-admin/firestore'

export function addLimitToLastConstraint<T>(query: CollectionReference<T> | Query<T>, limitToLast: number) {
  return query.limitToLast(limitToLast)
}
