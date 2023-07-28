import { CollectionReference, DocumentData, FieldPath, Query, WhereFilterOp } from '@google-cloud/firestore'

export const whereCollection =
  <T extends DocumentData, U extends T[keyof T] | unknown = unknown>(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: U
  ) =>
  (collection: CollectionReference<T> | Query<T>) =>
    collection.where(fieldPath, opStr, value)
