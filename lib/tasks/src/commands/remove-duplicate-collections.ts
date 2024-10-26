import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryDocumentSnapshots } from '@echo/firestore/helpers/query/get-query-document-snapshots'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Collection } from '@echo/model/types/collection'
import { error, info } from '@echo/tasks/helpers/logger'
import { getDuplicateCollections } from '@echo/tasks/tasks/get-duplicate-collections'
import { andThen, assoc, drop, head, type NonEmptyArray, otherwise, pipe, prop } from 'ramda'

export async function removeDuplicateCollections(): Promise<void> {
  await initializeFirebase()
  const groups = await getDuplicateCollections()
  for (const collections of groups) {
    const collection = head(collections as NonEmptyArray<Collection>)
    const snapshots = await pipe(
      collectionsCollection,
      queryWhere('slug', '==', collection.slug),
      getQueryDocumentSnapshots
    )()
    for (const snapshot of drop(1, snapshots)) {
      await pipe(
        prop('id'),
        deleteCollection,
        andThen((id) => {
          info({ collection: assoc('id', id, snapshot.data()) }, 'deleted duplicate collection')
        }),
        otherwise((err) => {
          error({ err, collection: assoc('id', snapshot.id, snapshot.data()) }, 'could not delete duplicate collection')
        })
      )(snapshot)
    }
  }
}
