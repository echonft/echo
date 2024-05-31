import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { getCollectionSwapsCountSnapshotByCollectionId } from '@echo/firestore-test/collection-swaps-count/get-collection-swaps-count-by-collection-id'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { isNil } from 'ramda'

export async function unchecked_updateCollectionSwapCounts(
  collectionId: string,
  data: DeepPartial<CollectionSwapsCount>
): Promise<CollectionSwapsCount> {
  const snapshot = await getCollectionSwapsCountSnapshotByCollectionId(collectionId)
  if (isNil(snapshot)) {
    throw Error(`CollectionSwapsCount does not exist for collectionId: ${collectionId}`)
  }
  return updateReference<CollectionSwapsCount>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    id: snapshot.id,
    data
  })
}
