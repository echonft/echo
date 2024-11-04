import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Address } from '@echo/model/types/address'
import { error, info, warn } from '@echo/tasks/helpers/logger'
import { fetchCollection } from '@echo/tasks/tasks/fetch-collection'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function fetchCollectionCommand(contract: Address) {
  await initializeFirebase()
  await pipe(
    fetchCollection,
    andThen((collection) => {
      if (isNil(collection)) {
        warn({ collection: { contract } }, 'collection not found')
      } else {
        info({ collection }, 'fetched collection')
      }
    }),
    otherwise((err) => {
      error({ err, collection: { contract } }, 'could not fetch collection')
    })
  )(contract)
}
