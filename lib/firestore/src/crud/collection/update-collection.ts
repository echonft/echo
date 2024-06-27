import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { Collection } from '@echo/model/types/collection'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { isNil } from 'ramda'

export async function updateCollection(
  data: DeepPartial<Collection> & Required<Pick<Collection, 'slug'>>
): Promise<Collection> {
  const snapshot = await getCollectionSnapshot(data.slug)
  if (isNil(snapshot)) {
    return Promise.reject(Error(`collection ${data.slug} does not exist`))
  }
  return updateReference<Collection>({
    collectionReference: getCollectionsCollectionReference(),
    id: snapshot.id,
    data
  })
}
