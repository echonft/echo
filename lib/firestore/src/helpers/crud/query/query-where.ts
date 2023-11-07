import type { CollectionReference, FieldPath, Query, WhereFilterOp } from 'firebase-admin/firestore'

export function queryWhere<T>(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
  return function (query: Query<T> | CollectionReference<T>) {
    return query.where(fieldPath, opStr, value)
  }
}
