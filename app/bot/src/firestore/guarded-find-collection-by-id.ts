import { findCollectionById } from '@echo/firestore/crud/collection/find-collection-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'

export async function guardedFindCollectionById(collectionId: string) {
  try {
    return await findCollectionById(collectionId)
  } catch (e) {
    logger.error(`Error fetching collection ${collectionId}: ${errorMessage(e)}`)
    return undefined
  }
}
