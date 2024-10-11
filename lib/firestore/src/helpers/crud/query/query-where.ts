import type { DocumentData, FieldPath, Query, WhereFilterOp } from 'firebase-admin/firestore'

export function queryWhere<AppModelType, DbModelType extends DocumentData>(
  fieldPath: string | FieldPath,
  opStr: WhereFilterOp,
  value: unknown
) {
  return function (query: Query<AppModelType, DbModelType>): Query<AppModelType, DbModelType> {
    return query.where(fieldPath, opStr, value)
  }
}
