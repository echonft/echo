import { handleOfferExecutedEvent } from '@echo/contract-listener/handlers/handle-offer-executed-event'
import { guardAsyncFn } from '@echo/contract-listener/helpers/guard-async-fn'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { modelLoggerSerializers } from '@echo/model/constants/logger-serializers'
import { getSupportedChains } from '@echo/utils/helpers/chains/get-supported-chains'
import { getBaseLogger } from '@echo/utils/services/logger'
import { getClientForChain } from '@echo/web3/helpers/chain/get-client-for-chain'
import { watchOfferExecutedEvents } from '@echo/web3/watchers/echo/watch-offer-executed-events'

const unsubscribeFns: VoidFunction[] = []
async function main() {
  const logger = getBaseLogger('Contract Listener', {
    serializers: modelLoggerSerializers
  })
  await initializeFirebase({
    logger
  })
  for (const chain of getSupportedChains()) {
    const client = await getClientForChain(chain)
    const childLogger = logger.child({ chain })
    const watchOfferUnsubscribeFn = watchOfferExecutedEvents({
      client,
      handler: guardAsyncFn({ fn: handleOfferExecutedEvent, logger: childLogger }),
      logger: childLogger
    })
    unsubscribeFns.push(watchOfferUnsubscribeFn)
    childLogger.info(`Watching events on ${chain}`)
  }
}

await main()
// Keep the process running indefinitely
process.stdin.resume()
