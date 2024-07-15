import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getQueryDocumentSnapshots } from '@echo/firestore/helpers/crud/query/get-query-document-snapshots'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Collection } from '@echo/model/types/collection'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { getDuplicateCollections } from '@echo/tasks/get-duplicate-collections'
import { andThen, assoc, drop, head, type NonEmptyArray, otherwise, pipe, prop } from 'ramda'

export async function removeDuplicateCollections() {
  const logger = getLogger(removeDuplicateCollections.name)
  await initializeFirebase()
  const groups = await getDuplicateCollections()
  for (const collections of groups) {
    const collection = head(collections as NonEmptyArray<Collection>)
    const snapshots = await pipe(
      getCollectionsCollectionReference,
      queryWhere<Collection>('slug', '==', collection.slug),
      getQueryDocumentSnapshots
    )()
    for (const snapshot of drop(1, snapshots)) {
      await pipe(
        prop('id'),
        deleteCollection,
        andThen((id: string) => {
          logger.info({ collection: assoc('id', id, snapshot.data()) }, 'deleted duplicate collection')
        }),
        otherwise((err) => {
          logger.error(
            { err, collection: assoc('id', snapshot.id, snapshot.data()) },
            'could not delete duplicate collection'
          )
        })
      )(snapshot)
    }
  }
}
