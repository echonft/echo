import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function fetchCollectionCommand(contract: Wallet) {
  const logger = getLogger(fetchCollectionCommand.name)
  await initializeFirebase()
  await pipe(
    fetchCollection,
    andThen((collection) => {
      if (isNil(collection)) {
        logger.warn({ collection: { contract } }, 'collection not found')
      } else {
        logger.info({ collection }, 'fetched collection')
      }
    }),
    otherwise((err) => {
      logger.error({ err, collection: { contract } }, 'could not fetch collection')
    })
  )({ contract, fetch, logger })
}
