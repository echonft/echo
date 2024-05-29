/* eslint-disable @typescript-eslint/no-misused-promises */
import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { handleOfferExecutedEvent } from '@echo/contract-listener/handlers/handle-offer-executed-event'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { SUPPORTED_CHAINS } from '@echo/utils/constants/chains/supported-chains'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { watchOfferExecutedEvents } from '@echo/web3/watchers/echo/watch-offer-executed-events'
import { watchErc721TransferEvents } from '@echo/web3/watchers/erc721/watch-erc721-transfer-events'

initializeFirebase()
for (const chain of SUPPORTED_CHAINS) {
  const client = getClientForChain(chain)
  watchOfferExecutedEvents({ client, handler: handleOfferExecutedEvent })
  watchErc721TransferEvents({ client, handler: handleErc721TransferEvent })
}

pinoLogger.info('Watching events...')
// Keep the process running indefinitely
process.stdin.resume()
