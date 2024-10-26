import { updateCollection } from '@echo/firestore/crud/collection/update-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Contract } from '@echo/model/types/contract'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { fetchCollection } from '@echo/tasks/tasks/fetch-collection'
import { andThen, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateCollectionCommand(contract: Contract) {
  await initializeFirebase()
  const collection = await pipe(
    fetchCollection,
    andThen(
      tap((collection) => {
        if (isNil(collection)) {
          warn({ collection: { contract } }, 'collection not found')
        }
      })
    ),
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not fetch collection')
      return undefined
    })
  )(contract)
  if (!isNil(collection)) {
    await pipe(
      updateCollection,
      andThen((updatedCollection) => {
        info({ collection: updatedCollection }, 'updated collection')
      }),
      otherwise((err) => {
        error({ err, contract }, 'could not update collection')
      })
    )(collection.slug, collection)
  }
}
