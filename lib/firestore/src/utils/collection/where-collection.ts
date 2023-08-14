import { CollectionReference, DocumentData, FieldPath, Query, WhereFilterOp } from '@google-cloud/firestore'

export const whereCollection =
  <T extends DocumentData>(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) =>
  (collection: CollectionReference<T> | Query<T>) =>
    collection.where(fieldPath, opStr, value)
