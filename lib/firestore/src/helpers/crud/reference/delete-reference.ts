import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type { DocumentData, DocumentReference } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function deleteReference<AppModelType, DbModelType extends DocumentData>(
  args: GetReferenceByIdArgs<AppModelType, DbModelType>
): Promise<string> {
  return pipe<
    [GetReferenceByIdArgs<AppModelType, DbModelType>],
    Promise<DocumentReference<AppModelType, DbModelType>>,
    Promise<string>
  >(
    getReferenceById,
    andThen(async (reference) => {
      await reference.delete()
      return reference.id
    })
  )(args)
}
