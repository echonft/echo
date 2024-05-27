import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { updateReference } from '@echo/firestore/helpers/crud/reference/update-reference'
import { type Collection } from '@echo/model/types/collection'
import { isNil } from 'ramda'

export async function updateCollection(args: { slug: string; data: Partial<Collection> }): Promise<Collection> {
  const snapshot = await getCollectionSnapshot(args.slug)
  if (isNil(snapshot)) {
    throw Error(`collection with slug ${args.slug} does not exists`)
  }
  return await updateReference<Collection>({
    collectionReference: getCollectionsCollectionReference(),
    id: snapshot.id,
    data: args.data
  })
}
