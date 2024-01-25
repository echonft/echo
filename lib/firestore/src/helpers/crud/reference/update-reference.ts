import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function updateReference<T>(
  id: string,
  data: Omit<Partial<T>, 'id'>
): (collectionReference: CollectionReference<T>) => Promise<T> {
  return function (collectionReference: CollectionReference<T>): Promise<T> {
    return pipe<[CollectionReference<T>], DocumentReference<T>, Promise<T>>(
      getReferenceById(id),
      async (ref: DocumentReference<T>) => {
        await ref.update(data)
        const snapshot = await ref.get()
        return snapshot.data() as T
      }
    )(collectionReference)
  }
}
