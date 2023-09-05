import { Query } from 'firebase-admin/firestore'

export function addLimitToLastConstraint<T>(query: Query<T>, limitToLast: number) {
  return query.limitToLast(limitToLast)
}
