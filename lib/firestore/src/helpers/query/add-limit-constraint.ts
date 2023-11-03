import { Query } from 'firebase-admin/firestore'

export function addLimitConstraint<T>(query: Query<T>, limit: number) {
  return query.limit(limit)
}
