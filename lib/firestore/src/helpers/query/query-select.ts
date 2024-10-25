import { type FieldPath, Query } from 'firebase-admin/firestore'

export function querySelect<AppModelType>(...field: (string | FieldPath)[]) {
  return function (query: Query<AppModelType>): Query<AppModelType> {
    return query.select(...field) as Query<AppModelType>
  }
}
