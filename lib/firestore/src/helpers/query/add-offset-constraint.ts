import { Query } from 'firebase-admin/firestore'

export function addOffsetConstraint<T>(query: Query<T>, offset: number) {
  return query.offset(offset)
}
