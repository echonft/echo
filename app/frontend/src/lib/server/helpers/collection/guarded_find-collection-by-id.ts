import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'

export function guarded_findCollectionById(collectionId: string) {
  try {
    return findCollectionById(collectionId)
  } catch (e) {
    throw new ServerError(`error getting collection with id ${collectionId}`, e)
  }
}
