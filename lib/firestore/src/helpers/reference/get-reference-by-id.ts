import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'

export interface GetReferenceByIdArgs<AppModelType> {
  readonly collectionReference: CollectionReference<AppModelType>
  readonly id: string
}

export function getReferenceById<AppModelType>(
  args: GetReferenceByIdArgs<AppModelType>
): DocumentReference<AppModelType> {
  return args.collectionReference.doc(args.id)
}
