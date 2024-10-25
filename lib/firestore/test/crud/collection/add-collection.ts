import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Collection } from '@echo/model/types/collection'

export function addCollection(data: Collection): Promise<string> {
  return setReference({
    collectionReference: getCollectionsCollectionReference(),
    data
  })
}
