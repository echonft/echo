import { parseLogs } from '@echo/contract-listener/helpers/parse-logs'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { TESTNET_CHAIN_BLAST } from '@echo/utils/constants/chains/chains'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { watchEchoEvents } from '@echo/web3/watchers/watch-echo-events'

void (function () {
  initializeFirebase()
  const client = getClientForChain(TESTNET_CHAIN_BLAST)
  watchEchoEvents(client, parseLogs, (error) => pinoLogger.error('Error watching event:', error))
  pinoLogger.info('Watching events...')
})()
