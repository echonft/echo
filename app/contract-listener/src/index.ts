import { parseLogs } from '@echo/contract-listener/helpers/parse-logs'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { TESTNET_CHAIN_BLAST } from '@echo/utils/constants/chains/chains'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { watchEchoEvents } from '@echo/web3/watchers/watch-echo-events'

initializeFirebase()
const client = getClientForChain(TESTNET_CHAIN_BLAST)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
watchEchoEvents(client, parseLogs, (error) => pinoLogger.error(`Error watching event: ${errorMessage(error)}`))
pinoLogger.info('Watching events...')
// Keep the process running indefinitely
process.stdin.resume()
