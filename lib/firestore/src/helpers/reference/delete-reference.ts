import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/reference/get-reference-by-id'
import type { DocumentReference } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteReference<AppModelType>(args: GetReferenceByIdArgs<AppModelType>): Promise<string> {
  return pipe<[GetReferenceByIdArgs<AppModelType>], DocumentReference<AppModelType>, Promise<string>>(
    getReferenceById,
    async (reference) => {
      await reference.delete()
      return reference.id
    }
  )(args)
}
