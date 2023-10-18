import { type Query } from 'firebase-admin/lib/firestore'

export function addLimitConstraint<T>(query: Query<T>, limit: number) {
  return query.limit(limit)
}
