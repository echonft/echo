import { getNewReference } from '@echo/firestore/helpers/crud/reference/get-new-reference'
import type { CollectionReference, DocumentData } from 'firebase-admin/firestore'

export interface SetReferenceArgs<AppModelType, DbModelType extends DocumentData> {
  readonly collectionReference: CollectionReference<AppModelType, DbModelType>
  readonly data: AppModelType
}

export async function setReference<AppModelType, DbModelType extends DocumentData>(
  args: SetReferenceArgs<AppModelType, DbModelType>
): Promise<string> {
  const ref = getNewReference(args.collectionReference)
  await ref.set(args.data)
  return ref.id
}
