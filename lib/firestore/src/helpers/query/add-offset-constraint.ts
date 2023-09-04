import { CollectionReference, Query } from 'firebase-admin/firestore'

export function addOffsetConstraint<T>(query: CollectionReference<T> | Query<T>, offset: number) {
  return query.offset(offset)
}
