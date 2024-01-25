import { getOfferThreadsCloseRequestsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-threads-close-requests-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import type { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteOfferThreadCloseRequest(id: string): Promise<WriteResult> {
  return pipe(getOfferThreadsCloseRequestsCollectionReference, deleteReference(id))()
}
