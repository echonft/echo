import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import type { Wallet } from '@echo/model/types/wallet'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { getBaseLogger } from '@echo/utils/services/logger'

export async function fetchCollectionCommand(contract: Wallet) {
  const logger = getBaseLogger('FetchCollectionCommand', { serializers: modelLoggerSerializers })
  try {
    await initializeFirebase()
    const collection = await fetchCollection({ contract, logger })
    logger.info({ collection }, 'successfuly received collection')
  } catch (err) {
    logger.error(
      {
        contract,
        err
      },
      'error fetching collection'
    )
  }
}
