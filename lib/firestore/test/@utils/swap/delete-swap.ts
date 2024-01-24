import { getSwapsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-swaps-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteSwap(id: string): Promise<WriteResult> {
  return pipe(getSwapsCollectionReference, deleteReference(id))()
}
