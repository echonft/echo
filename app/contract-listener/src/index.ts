import { handleErc721TransferEvent } from '@echo/contract-listener/handlers/handle-erc721-transfer-event'
import { handleOfferExecutedEvent } from '@echo/contract-listener/handlers/handle-offer-executed-event'
import { guardAsyncFn } from '@echo/contract-listener/helpers/guard'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { getBaseLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Logger } from '@echo/utils/types/logger'
import { getClientForChain } from '@echo/web3/helpers/chain/get-client-for-chain'
import { watchOfferExecutedEvents } from '@echo/web3/watchers/echo/watch-offer-executed-events'
import { watchErc721TransferEvents } from '@echo/web3/watchers/erc721/watch-erc721-transfer-events'
import { partial } from 'ramda'

await initializeFirebase()
export const loggers = new Map<ChainName, Logger>()
for (const chain of getSupportedChains()) {
  const client = await getClientForChain(chain)
  const logger = getBaseLogger('Contract Listener', {
    includeNetwork: true,
    serializers: modelLoggerSerializers,
    baseMergeObject: { chain }
  })
  loggers.set(chain, logger)
  watchOfferExecutedEvents({ client, handler: partial(guardAsyncFn({ fn: handleOfferExecutedEvent }), [logger]) })
  watchErc721TransferEvents({ client, handler: partial(guardAsyncFn({ fn: handleErc721TransferEvent }), [logger]) })
  logger.info(`Watching events on ${chain}`)
}

// Keep the process running indefinitely
process.stdin.resume()
