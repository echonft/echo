import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'

export function addCollection(data: CollectionDocument): Promise<string> {
  return setReference({
    collectionReference: collectionsCollection(),
    data
  })
}
