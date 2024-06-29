import { updateCollection } from '@echo/firestore/crud/collection/update-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function updateCollectionCommand(contract: Wallet) {
  const logger = getLogger(updateCollectionCommand.name)
  await initializeFirebase()
  const collection = await fetchCollection({ contract, fetch, logger })
  if (isNil(collection)) {
    logger.error({ contract }, 'could not fetch collection')
    return
  }
  await pipe(
    updateCollection,
    andThen((updatedCollection) => {
      logger.info({ collection: updatedCollection }, 'updated collection')
    }),
    otherwise((err) => {
      logger.error({ err, contract }, 'could not update collection')
    })
  )(collection)
}
