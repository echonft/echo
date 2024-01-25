import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteCollectionSwapsCount(id: string): Promise<WriteResult> {
  return pipe(getCollectionSwapsCountCollectionReference, deleteReference(id))()
}
