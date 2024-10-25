import type { FieldPath, OrderByDirection, Query } from 'firebase-admin/firestore'

export function queryOrderBy<AppModelType>(fieldPath: string | FieldPath, directionStr?: OrderByDirection) {
  return function (query: Query<AppModelType>): Query<AppModelType> {
    return query.orderBy(fieldPath, directionStr)
  }
}
