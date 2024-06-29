import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { Wallet } from '@echo/model/types/wallet'
import { getLogger } from '@echo/tasks/commands/get-logger'
import { fetchCollection } from '@echo/tasks/fetch-collection'
import { isNil } from 'ramda'

export async function fetchCollectionCommand(contract: Wallet) {
  const logger = getLogger(fetchCollectionCommand.name)
  await initializeFirebase()
  const collection = await fetchCollection({ contract, fetch, logger })
  if (isNil(collection)) {
    logger.error({ contract }, 'could not fetch collection')
    return
  }
  logger.info({ collection }, 'fetched collection')
}
