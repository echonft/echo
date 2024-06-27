import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { getBaseLogger } from '@echo/utils/services/logger'
import { isNil } from 'ramda'

export async function fetchCollectionCommand(contract: Wallet) {
  const logger = getBaseLogger('FetchCollectionCommand', { serializers: modelLoggerSerializers })
  await initializeFirebase()
  const collection = await fetchCollection({ contract, logger })
  if (isNil(collection)) {
    logger.error({ contract }, 'could not fetch collection for contract')
    return
  }
  logger.info({ collection }, 'fetched collection')
}
