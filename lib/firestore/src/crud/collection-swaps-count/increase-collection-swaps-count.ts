import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQueryUniqueSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { inc, isNil, pipe } from 'ramda'

export async function increaseCollectionSwapsCount(collectionId: string): Promise<CollectionSwapsCount> {
  const collection = await findCollectionById(collectionId)
  if (isNil(collection)) {
    throw Error(
      `trying to increase swaps count for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const existingSwapsCount = await pipe(
    getCollectionSwapsCountCollectionReference,
    queryWhere('collectionId', '==', collectionId),
    getQueryUniqueSnapshot<CollectionSwapsCount>
  )()
  if (isNil(existingSwapsCount)) {
    const data = { collectionId, swapsCount: 1 }
    await setReference<CollectionSwapsCount>({
      collectionReference: getCollectionSwapsCountCollectionReference(),
      data
    })
    return data
  }
  return updateReference<CollectionSwapsCount>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    id: existingSwapsCount.id,
    data: { swapsCount: inc(existingSwapsCount.data().swapsCount) }
  })
}
