import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Collection } from '@echo/model/types/collection'
import { pipe } from 'ramda'

export async function unchecked_updateCollection(
  id: string,
  data: Partial<Omit<Collection, 'id'>>
): Promise<Collection> {
  return pipe(getCollectionsCollectionReference, updateReference<Collection>(id, data))()
}
