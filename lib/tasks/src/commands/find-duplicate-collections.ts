import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { getDuplicateCollections } from '@echo/tasks/get-duplicate-collections'
import { andThen, map, pipe, tap } from 'ramda'

export async function findDuplicateCollections() {
  const logger = getLogger(findDuplicateCollections.name)
  await initializeFirebase()
  await pipe(
    getDuplicateCollections,
    andThen(
      map(
        map(
          tap((collection) => {
            logger.warn({ collection }, 'collection is a duplicate')
          })
        )
      )
    )
  )()
}
