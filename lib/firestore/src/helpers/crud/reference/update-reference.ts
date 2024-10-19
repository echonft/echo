import { getReferenceById, type GetReferenceByIdArgs } from '@echo/firestore/helpers/crud/reference/get-reference-by-id'
import type {
  CollectionReference,
  DocumentData,
  DocumentReference,
  PartialWithFieldValue
} from 'firebase-admin/firestore'
import { omit, pipe } from 'ramda'

export interface UpdateReferenceArgs<AppModelType, DbModelType extends DocumentData> {
  readonly collectionReference: CollectionReference<AppModelType, DbModelType>
  readonly data: PartialWithFieldValue<AppModelType>
  readonly id: string
}

export async function updateReference<AppModelType, DbModelType extends DocumentData>(
  args: UpdateReferenceArgs<AppModelType, DbModelType>
): Promise<AppModelType> {
  const ref = pipe<
    [UpdateReferenceArgs<AppModelType, DbModelType>],
    GetReferenceByIdArgs<AppModelType, DbModelType>,
    DocumentReference<AppModelType, DbModelType>
  >(
    omit(['data']),
    getReferenceById
  )(args)
  await ref.set(args.data, { merge: true })
  const snapshot = await ref.get()
  return snapshot.data() as NonNullable<AppModelType>
}
