import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { DocumentData, DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteReference<AppModelType, DbModelType extends DocumentData>(
  args: GetReferenceByIdArgs<AppModelType, DbModelType>
): Promise<string> {
  return pipe<
    [GetReferenceByIdArgs<AppModelType, DbModelType>],
    DocumentReference<AppModelType, DbModelType>,
    Promise<string>
  >(getReferenceById, async (reference) => {
    await reference.delete()
    return reference.id
  })(args)
}
