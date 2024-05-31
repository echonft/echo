import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import type { DocumentReference } from 'firebase-admin/firestore'
import { omit, pipe } from 'ramda'

export interface UpdateReferenceArgs<T> extends GetReferenceByIdArgs<T> {
  data: DeepPartial<T>
}

export async function updateReference<T>(args: UpdateReferenceArgs<T>): Promise<T> {
  const ref = pipe<[UpdateReferenceArgs<T>], GetReferenceByIdArgs<T>, DocumentReference<T>>(
    omit(['data']),
    getReferenceById
  )(args)
  await ref.update(args.data)
  const snapshot = await ref.get()
  return snapshot.data() as T
}
