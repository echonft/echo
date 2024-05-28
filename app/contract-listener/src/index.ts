/* eslint-disable @typescript-eslint/no-misused-promises */
import { getChain } from '@echo/contract-listener/helpers/get-chain'
import { parseEchoLogs } from '@echo/contract-listener/parsers/parse-echo-logs'
import { parseErc721TansferLogs } from '@echo/contract-listener/parsers/parse-erc721-tansfer-logs'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { watchEchoEvents } from '@echo/web3/watchers/watch-echo-events'
import { watchErc721TransferEvents } from '@echo/web3/watchers/watch-erc721-transfer-events'

initializeFirebase()
const client = getClientForChain(getChain())
watchEchoEvents(client, parseEchoLogs, (error) => pinoLogger.error(`Error watching Echo event: ${errorMessage(error)}`))
watchErc721TransferEvents(client, parseErc721TansferLogs, (error) =>
  pinoLogger.error(`Error watching ERC721 event: ${errorMessage(error)}`)
)

pinoLogger.info('Watching events...')
// Keep the process running indefinitely
process.stdin.resume()
