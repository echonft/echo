import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
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
    getQueryUniqueData
  )()
  if (isNil(existingSwapsCount)) {
    return pipe(getCollectionSwapsCountCollectionReference, setReference({ collectionId, swapsCount: 1 }))()
  }
  return pipe(
    getCollectionSwapsCountCollectionReference,
    updateReference<CollectionSwapsCount>(existingSwapsCount.id, { swapsCount: inc(existingSwapsCount.swapsCount) })
  )()
}
