import type { FieldPath, Query, WhereFilterOp } from 'firebase-admin/firestore'

export function queryWhere<T>(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
  return function (query: Query<T>): Query<T> {
    return query.where(fieldPath, opStr, value)
  }
}
