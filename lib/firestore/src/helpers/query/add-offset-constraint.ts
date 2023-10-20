import { type Query } from 'firebase-admin/lib/firestore'

export function addOffsetConstraint<T>(query: Query<T>, offset: number) {
  return query.offset(offset)
}
