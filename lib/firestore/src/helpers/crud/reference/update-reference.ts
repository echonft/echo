import { getReferenceById } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { CollectionReference, DocumentReference, UpdateData, WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function updateReference<T>(
  id: string,
  data: UpdateData<T>
): (collectionReference: CollectionReference<T>) => Promise<WriteResult> {
  return function (collectionReference: CollectionReference<T>): Promise<WriteResult> {
    return pipe<[CollectionReference<T>], DocumentReference<T>, Promise<WriteResult>>(
      getReferenceById(id),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (ref: DocumentReference<T>) => ref.update(data)
    )(collectionReference)
  }
}
