import { updateCollection } from '@echo/firestore/crud/collection/update-collection'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { getBaseLogger } from '@echo/utils/services/logger'
import { andThen, isNil, otherwise, pipe } from 'ramda'

export async function updateCollectionCommand(contract: Wallet) {
  const logger = getBaseLogger('UpdateCollectionCommand', { serializers: modelLoggerSerializers })
  try {
    await initializeFirebase()
    const collection = await fetchCollection({ contract, logger })
    if (isNil(collection)) {
      logger.error({ contract }, 'could not fetch collection for contract')
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
  } catch (err) {
    logger.error({ err, collection: { contract } }, 'error updating collection')
  }
}
