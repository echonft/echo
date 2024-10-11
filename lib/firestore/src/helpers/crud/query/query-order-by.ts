import type { DocumentData, FieldPath, OrderByDirection, Query } from 'firebase-admin/firestore'

export function queryOrderBy<AppModelType, DbModelType extends DocumentData>(
  fieldPath: string | FieldPath,
  directionStr?: OrderByDirection
) {
  return function (query: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query.orderBy(fieldPath, directionStr)
  }
}
