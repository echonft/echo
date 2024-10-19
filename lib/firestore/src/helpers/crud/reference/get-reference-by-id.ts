import type { CollectionReference, DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface GetReferenceByIdArgs<AppModelType, DbModelType extends DocumentData> {
  readonly collectionReference: CollectionReference<AppModelType, DbModelType>
  readonly id: string
}

export function getReferenceById<AppModelType, DbModelType extends DocumentData>(
  args: GetReferenceByIdArgs<AppModelType, DbModelType>
): DocumentReference<AppModelType, DbModelType> {
  return args.collectionReference.doc(args.id)
}
