import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { addCollection } from '@echo/tasks/add-collection'
import { getBaseLogger } from '@echo/utils/services/logger'

export async function updateCollectionCommand(contract: Wallet) {
  const logger = getBaseLogger('UpdateCollectionCommand', { serializers: modelLoggerSerializers })
  try {
    await initializeFirebase()
    await addCollection({ contract, logger })
  } catch (err) {
    logger.error({ err, collection: { contract } }, 'error updating collection')
  }
}
