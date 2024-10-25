import { getReferenceDocumentSnapshot } from '@echo/firestore/helpers/reference/get-reference-document-snapshot'
import type { Nullable } from '@echo/utils/types/nullable'
import type { DocumentReference, DocumentSnapshot } from 'firebase-admin/firestore'
import { always, andThen, ifElse, invoker, pipe, prop } from 'ramda'

export async function getReferenceData<AppModelType>(
  ref: DocumentReference<AppModelType>
): Promise<Nullable<AppModelType>> {
  return pipe(
    getReferenceDocumentSnapshot<AppModelType>,
    andThen(
      ifElse<[DocumentSnapshot<AppModelType>], Nullable<AppModelType>, Nullable<AppModelType>>(
        prop('exists'),
        invoker(0, 'data'),
        always(undefined)
      )
    )
  )(ref)
}
