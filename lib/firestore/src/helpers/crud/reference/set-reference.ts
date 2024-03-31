import { getNewReference } from '@echo/firestore/helpers/crud/reference/get-new-reference'
import type { WithId } from '@echo/model/types/with-id'
import type { CollectionReference, DocumentReference } from 'firebase-admin/firestore'
import { assoc, pipe } from 'ramda'

export function setReference<T extends WithId>(
  data: Omit<T, 'id'>
): (collectionReference: CollectionReference<T>) => Promise<T> {
  return function (collectionReference: CollectionReference<T>): Promise<T> {
    return pipe<[CollectionReference<T>], DocumentReference<T>, Promise<T>>(
      getNewReference,
      async (ref: DocumentReference<T>) => {
        const obj = assoc('id', ref.id, data) as T
        await ref.set(obj)
        return obj
      }
    )(collectionReference)
  }
}
