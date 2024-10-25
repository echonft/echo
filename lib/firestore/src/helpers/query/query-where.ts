import type { FieldPath, Query, WhereFilterOp } from 'firebase-admin/firestore'

export function queryWhere<AppModelType>(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
  return function (query: Query<AppModelType>): Query<AppModelType> {
    return query.where(fieldPath, opStr, value)
  }
}
