import type { DocumentReference } from 'firebase-admin/firestore'

export interface SetReferenceArgs<T> {
  documentReference: DocumentReference<T>
  data: T
}

export async function setReferenceById<T>(args: SetReferenceArgs<T>): Promise<string> {
  const { documentReference, data } = args
  await documentReference.set(data)
  return documentReference.id
}
