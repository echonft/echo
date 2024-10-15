import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionSwapsCountCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collection-swaps-count-collection-reference'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import type { CollectionSwapsCountDocumentData } from '@echo/firestore/types/model/collection-swaps-count-document-data'
import { inc, isNil, pipe } from 'ramda'

export async function increaseCollectionSwapsCount(slug: string): Promise<CollectionSwapsCountDocumentData> {
  const collectionSnapshot = await getCollectionSnapshot(slug)
  if (isNil(collectionSnapshot)) {
    return Promise.reject(
      Error(`trying to increase swaps count for collection ${slug} but this collection does not exist`)
    )
  }
  const existingSwapsCount = await pipe(
    getCollectionSwapsCountCollectionReference,
    queryWhere('collectionId', '==', collectionSnapshot.id),
    getQueryUniqueDocumentSnapshot<CollectionSwapsCountDocumentData, CollectionSwapsCountDocumentData>
  )()
  if (isNil(existingSwapsCount)) {
    const data: CollectionSwapsCountDocumentData = { collectionId: collectionSnapshot.id, swapsCount: 1 }
    await setReference<CollectionSwapsCountDocumentData, CollectionSwapsCountDocumentData>({
      collectionReference: getCollectionSwapsCountCollectionReference(),
      data
    })
    return data
  }
  return updateReference<CollectionSwapsCountDocumentData, CollectionSwapsCountDocumentData>({
    collectionReference: getCollectionSwapsCountCollectionReference(),
    id: existingSwapsCount.id,
    data: { swapsCount: inc(existingSwapsCount.data().swapsCount) }
  })
}
