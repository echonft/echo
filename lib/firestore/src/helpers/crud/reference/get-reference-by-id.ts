import { ReferenceError } from '@echo/firestore/constants/errors/reference-error'
import type { CollectionReference, DocumentData, DocumentReference } from 'firebase-admin/firestore'

export interface GetReferenceByIdArgs<AppModelType, DbModelType extends DocumentData> {
  readonly collectionReference: CollectionReference<AppModelType, DbModelType>
  readonly id: string
}

export async function getReferenceById<AppModelType, DbModelType extends DocumentData>(
  args: GetReferenceByIdArgs<AppModelType, DbModelType>
): Promise<DocumentReference<AppModelType, DbModelType>> {
  const ref = args.collectionReference.doc(args.id)
  const snapshot = await ref.get()
  if (!snapshot.exists) {
    throw Error(ReferenceError.NotFound)
  }
  return ref
}
