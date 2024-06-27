import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { updateCollection } from '@echo/tasks/update-collection'
import { getBaseLogger } from '@echo/utils/services/logger'

export async function updateCollectionCommand(contract: Wallet) {
  const logger = getBaseLogger('UpdateCollectionCommand', { serializers: modelLoggerSerializers })
  try {
    await initializeFirebase()
    await updateCollection({ contract, logger })
  } catch (err) {
    logger.error({ err, collection: { contract } }, 'error updating collection')
  }
}
