import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { CollectionReference, DocumentData, DocumentReference, UpdateData } from 'firebase-admin/firestore'
import { omit, pipe } from 'ramda'

export interface UpdateReferenceArgs<DbModelType extends DocumentData> {
  readonly collectionReference: CollectionReference<DbModelType, DbModelType>
  readonly id: string
  readonly data: UpdateData<DbModelType>
}

export async function updateReferenceWithDocumentData<DbModelType extends DocumentData>(
  args: UpdateReferenceArgs<DbModelType>
): Promise<DbModelType> {
  const ref = await pipe<
    [UpdateReferenceArgs<DbModelType>],
    GetReferenceByIdArgs<DbModelType, DbModelType>,
    Promise<DocumentReference<DbModelType, DbModelType>>
  >(
    omit(['data']),
    getReferenceById
  )(args)
  await ref.update(args.data)
  const snapshot = await ref.get()
  return snapshot.data() as NonNullable<DbModelType>
}
