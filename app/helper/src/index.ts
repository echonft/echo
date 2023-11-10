import { listenToContract } from '@echo/helper/listeners/listen-to-contract'
import { listenToWallets } from '@echo/helper/listeners/listen-to-wallets'
import { initializeServer } from '@echo/helper/services/initialize-server'
import { updateDbJob } from '@echo/helper/tasks/update-db-job'
import { logger } from '@echo/utils/services/logger'

void (function () {
  logger.info('Initializing server...')
  initializeServer()
  updateDbJob()
  listenToWallets()
  listenToContract()
  logger.info('Server is ready and listening!')
})()
