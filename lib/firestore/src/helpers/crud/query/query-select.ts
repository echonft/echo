import { type DocumentData, type FieldPath, Query } from 'firebase-admin/firestore'

export function querySelect<AppModelType, DbModelType extends DocumentData>(...field: (string | FieldPath)[]) {
  return function (query: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query.select(...field) as Query<AppModelType, DbModelType>
  }
}
