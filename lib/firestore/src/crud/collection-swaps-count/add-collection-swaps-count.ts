import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { pipe } from 'ramda'

export function addCollectionSwapsCount(collectionId: string): Promise<CollectionSwapsCount> {
  return pipe(getCollectionSwapsCountCollectionReference, setReference({ collectionId, swapsCount: 0 }))()
}
