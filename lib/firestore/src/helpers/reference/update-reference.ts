import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/reference/get-reference-by-id'
import type { DocumentReference, UpdateData } from 'firebase-admin/firestore'
import { omit, pipe } from 'ramda'

export interface UpdateReferenceArgs<AppModelType extends object> extends GetReferenceByIdArgs<AppModelType> {
  readonly data: UpdateData<AppModelType>
}

export async function updateReference<AppModelType extends object>(
  args: UpdateReferenceArgs<AppModelType>
): Promise<AppModelType> {
  const ref = pipe<
    [UpdateReferenceArgs<AppModelType>],
    GetReferenceByIdArgs<AppModelType>,
    DocumentReference<AppModelType>
  >(
    omit(['data']),
    getReferenceById
  )(args)
  await ref.update(args.data)
  const snapshot = await ref.get()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return snapshot.data()!
}
