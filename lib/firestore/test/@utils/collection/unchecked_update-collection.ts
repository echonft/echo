import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Collection } from '@echo/model/types/collection'
import { WriteResult } from 'firebase-admin/firestore'
import { pipe } from 'ramda'

export async function unchecked_updateCollection(
  id: string,
  data: Partial<Omit<Collection, 'id'>>
): Promise<WriteResult> {
  return pipe(getCollectionsCollectionReference, updateReference(id, data))()
}
