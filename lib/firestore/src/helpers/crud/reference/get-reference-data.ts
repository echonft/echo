import { getReferenceDocumentSnapshot } from '@echo/firestore/helpers/crud/reference/get-reference-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { always, andThen, ifElse, invoker, pipe, prop } from 'ramda'

export async function getReferenceData<AppModelType, DbModelType extends DocumentData>(
  ref: DocumentReference<AppModelType, DbModelType>
): Promise<Nullable<AppModelType>> {
  return pipe(
    getReferenceDocumentSnapshot<AppModelType, DbModelType>,
    andThen(
      ifElse<[DocumentSnapshot<AppModelType, DbModelType>], Nullable<AppModelType>, Nullable<AppModelType>>(
        prop('exists'),
        invoker(0, 'data'),
        always(undefined)
      )
    )
  )(ref)
}
