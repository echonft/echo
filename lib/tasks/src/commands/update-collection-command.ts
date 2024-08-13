import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { updateCollection } from '@echo/firestore/utils/collection/update-collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { andThen, isNil, otherwise, pipe, tap } from 'ramda'

export async function updateCollectionCommand(contract: Wallet) {
  const logger = getLogger(updateCollectionCommand.name)
  await initializeFirebase()
  const collection = await pipe(
    fetchCollection,
    andThen(
      tap((collection) => {
        if (isNil(collection)) {
          logger.warn({ collection: { contract } }, 'collection not found')
        }
      })
    ),
    otherwise((err) => {
      logger.error({ err, collection: { contract } }, 'could not fetch collection')
      return undefined
    })
  )({ contract, fetch, logger })
  if (!isNil(collection)) {
    await pipe(
      updateCollection,
      andThen((updatedCollection) => {
        logger.info({ collection: updatedCollection }, 'updated collection')
      }),
      otherwise((err) => {
        logger.error({ err, contract }, 'could not update collection')
      })
    )(collection.slug, collection)
  }
}
