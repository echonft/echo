import type { Query, QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshot<T>(query: Query<T>): Promise<QuerySnapshot<T>> {
  return query.get()
}
