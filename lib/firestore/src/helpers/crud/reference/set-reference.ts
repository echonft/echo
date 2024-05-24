import { getNewReference } from '@echo/firestore/helpers/crud/reference/get-new-reference'
import type { CollectionReference } from 'firebase-admin/firestore'

export interface SetReferenceArgs<T> {
  collectionReference: CollectionReference<T>
  data: T
}

export async function setReference<T>(args: SetReferenceArgs<T>): Promise<string> {
  const ref = getNewReference(args.collectionReference)
  await ref.set(args.data)
  return ref.id
}
