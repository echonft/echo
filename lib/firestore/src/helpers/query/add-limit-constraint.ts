import { CollectionReference, Query } from 'firebase-admin/firestore'

export function addLimitConstraint<T>(query: CollectionReference<T> | Query<T>, limit: number) {
  return query.limit(limit)
}
