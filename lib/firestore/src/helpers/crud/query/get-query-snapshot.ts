import type { DocumentData, Query, QuerySnapshot } from 'firebase-admin/firestore'

export function getQuerySnapshot<AppModelType, DbModelType extends DocumentData>(
  query: Query<AppModelType, DbModelType>
): Promise<QuerySnapshot<AppModelType, DbModelType>> {
  return query.get()
}
