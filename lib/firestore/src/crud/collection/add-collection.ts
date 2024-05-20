import { findCollection } from '@echo/firestore/crud/collection/find-collection'
import { addCollectionSwapsCount } from '@echo/firestore/crud/collection-swaps-count/add-collection-swaps-count'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import { type Collection } from '@echo/model/types/collection'
import { isNil, pipe } from 'ramda'

export async function addCollection(data: Collection): Promise<Collection> {
  const collectionBySlug = await findCollection(data.slug)
  if (!isNil(collectionBySlug)) {
    throw Error(`a collection with slug ${data.slug} already exists`)
  }
  const collectionByContract = await pipe(
    getCollectionsCollectionReference,
    queryWhere<Collection>('contract.chainId', '==', data.contract.chainId),
    queryWhere<Collection>('contract.address', '==', data.contract.address),
    getQueryUniqueData
  )()
  if (!isNil(collectionByContract)) {
    throw Error(`a collection with contract ${JSON.stringify(data.contract)} already exists`)
  }
  const collection = await setReference<Collection>({ collectionReference: getCollectionsCollectionReference(), data })
  // add swaps count (to 0) in the database
  await addCollectionSwapsCount(collection.id)
  return collection
}
