import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteReference<T>(args: GetReferenceByIdArgs<T>): Promise<string> {
  return pipe<[GetReferenceByIdArgs<T>], DocumentReference<T>, Promise<string>>(getReferenceById, async (reference) => {
    await reference.delete()
    return reference.id
  })(args)
}
