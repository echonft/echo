import { getNewReference } from '@echo/firestore/helpers/reference/get-new-reference'
import type { CollectionReference } from 'firebase-admin/firestore'

export interface SetReferenceArgs<AppModelType> {
  readonly collectionReference: CollectionReference<AppModelType>
  readonly data: AppModelType
}

export async function setReference<AppModelType>(args: SetReferenceArgs<AppModelType>): Promise<string> {
  const ref = getNewReference(args.collectionReference)
  await ref.set(args.data)
  return ref.id
}
