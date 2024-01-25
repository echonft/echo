import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { CollectionReference, DocumentReference, WriteResult } from 'firebase-admin/firestore'
import { invoker, pipe } from 'ramda'

export function deleteReference<T>(id: string): (collectionReference: CollectionReference<T>) => Promise<WriteResult> {
  return function (collectionReference: CollectionReference<T>): Promise<WriteResult> {
    return pipe<[CollectionReference<T>], DocumentReference<T>, Promise<WriteResult>>(
      getReferenceById(id),
      invoker(0, 'delete')
    )(collectionReference)
  }
}
