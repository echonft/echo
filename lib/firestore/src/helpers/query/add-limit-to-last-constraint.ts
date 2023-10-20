import { type Query } from 'firebase-admin/lib/firestore'

export function addLimitToLastConstraint<T>(query: Query<T>, limitToLast: number) {
  return query.limitToLast(limitToLast)
}
