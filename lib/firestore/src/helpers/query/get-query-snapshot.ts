import type { Query, QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshot<AppModelType>(query: Query<AppModelType>): Promise<QuerySnapshot<AppModelType>> {
  return query.get()
}
