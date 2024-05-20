import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'

export interface GetReferenceByIdArgs<T> {
  collectionReference: CollectionReference<T>
  id: string
}

export function getReferenceById<T>(args: GetReferenceByIdArgs<T>): DocumentReference<T> {
  return args.collectionReference.doc(args.id)
}
