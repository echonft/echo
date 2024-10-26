import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { warn } from '@echo/tasks/helpers/logger'
import { getDuplicateCollections } from '@echo/tasks/tasks/get-duplicate-collections'
import { andThen, map, pipe, tap } from 'ramda'

export async function findDuplicateCollections() {
  await initializeFirebase()
  await pipe(
    getDuplicateCollections,
    andThen(
      map(
        map(
          tap((collection) => {
            warn({ collection }, 'collection is a duplicate')
          })
        )
      )
    )
  )()
}
