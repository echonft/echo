import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { deleteReference } from '@echo/firestore/helpers/crud/reference/delete-reference'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export function deleteCollection(id: string): Promise<WriteResult> {
  return pipe(getCollectionsCollectionReference, deleteReference(id))()
}
