import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'

export function unchecked_updateCollectionSwapCounts(
  id: string,
  data: Partial<Omit<CollectionSwapsCount, 'id'>>
): Promise<CollectionSwapsCount> {
  return updateReference<CollectionSwapsCount>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    id,
    data
  })
}
