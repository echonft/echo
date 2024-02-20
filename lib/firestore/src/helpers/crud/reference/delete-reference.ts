import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteReference<T>(id: string): (collectionReference: CollectionReference<T>) => Promise<string> {
  return function (collectionReference: CollectionReference<T>): Promise<string> {
    return pipe<[CollectionReference<T>], DocumentReference<T>, Promise<string>>(
      getReferenceById(id),
      async (reference) => {
        await reference.delete()
        return reference.id
      }
    )(collectionReference)
  }
}
