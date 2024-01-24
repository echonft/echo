import { getNewReference } from '@echo/firestore/helpers/crud/reference/get-new-reference'
import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function setReference<T>(data: T): (collectionReference: CollectionReference<T>) => Promise<T> {
  return function (collectionReference: CollectionReference<T>): Promise<T> {
    return pipe<[CollectionReference<T>], DocumentReference<T>, Promise<T>>(
      getNewReference,
      async (ref: DocumentReference<T>) => {
        await ref.set(data)
        return data
      }
    )(collectionReference)
  }
}
